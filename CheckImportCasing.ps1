# Helper function to check path existence with exact casing
function Test-PathCaseSensitive {
    param($path)

    # Normalize full path
    # Use -ErrorVariable to capture errors instead of just SilentlyContinue
    $fullPath = Resolve-Path -Path $path -ErrorAction SilentlyContinue -ErrorVariable resolvePathError
    if ($resolvePathError) {
        # The path doesn't exist at all, so case can't be checked.
        # This covers cases where the initial $path itself is invalid or points to a non-existent file/dir.
        return $false
    }

    $fullPath = $fullPath.ProviderPath

    # If the path is just a drive root (e.g., 'C:\' or 'D:'), it exists and its casing is technically correct.
    # PowerShell's Split-Path "D:\" -Parent returns "", so we need to handle this as a base case.
    if ($fullPath -match '^[A-Za-z]:\\?$') {
        # Matches 'C:' or 'C:\'
        return $true
    }

    $parent = Split-Path $fullPath -Parent
    $name = Split-Path $fullPath -Leaf

    # If $parent is empty string, it means $fullPath was already a root (e.g., 'C:', 'C:\').
    # We've already handled direct drive roots above. If it's empty here, it implies an issue or that
    # $name is the only component left and needs to be checked against its parent (which is the root).
    # This case also covers scenarios like "C:filename.txt" where parent is empty.
    if ([string]::IsNullOrEmpty($parent)) {
        # This implies $fullPath was something like "file.txt" and we are at the very top level
        # relative to the current directory when Resolve-Path was called without a drive.
        # In a typical use case for absolute paths, this shouldn't be reached if Resolve-Path works correctly
        # unless $path was already a filename in the current directory and we are trying to check its parent.
        # For simplicity and given the context of relative paths starting with '.', we assume
        # Resolve-Path gives a fully qualified path if it finds one.
        # If we reach here, it implies we successfully resolved a top-level file/folder.
        return $true # If resolve-path succeeded, assume root element is fine.
    }

    # Get child items of the parent directory.
    # IMPORTANT: Ensure $parent is not empty. The previous checks should prevent this.
    try {
        $items = Get-ChildItem -LiteralPath $parent -ErrorAction Stop
    }
    catch {
        Write-Error "Error getting child items for parent: '$parent'. Details: $($_.Exception.Message)"
        return $false
    }

    foreach ($item in $items) {
        if ($item.Name -eq $name) {
            # Found the item with exact casing. Now check its parent recursively.
            return Test-PathCaseSensitive $parent
        }
    }

    # Item with exact casing not found in the parent directory
    return $false
}

# Root directory where your source files live
$rootDir = "src"

# Get all .js and .jsx files
# Ensure $rootDir exists. If not, Get-ChildItem might throw an error or return nothing.
if (-not (Test-Path $rootDir)) {
    Write-Error "Root directory '$rootDir' not found. Please ensure it exists and the script is run from the correct location."
    exit 1
}

$files = Get-ChildItem -Path $rootDir -Recurse -Include *.js, *.jsx -File # -File ensures only files are returned

# Regex to extract import paths: matches import ... from 'path' or import('path')
$importRegex = [regex]::new("import(?:.+from)?\s*['""]([^'""]+)['""]")

$errors = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName

    foreach ($line in $content) {
        $match = $importRegex.Match($line)
        if ($match.Success) {
            $importPath = $match.Groups[1].Value

            # We only check relative imports starting with '.' or '..'
            if ($importPath.StartsWith('.')) {

                # Resolve import path relative to file directory
                $fileDir = Split-Path $file.FullName
                # Make sure $fileDir is absolute and clean for Join-Path
                $fileDirAbsolute = (Resolve-Path $fileDir).ProviderPath

                $fullImportPathCandidate = Join-Path $fileDirAbsolute $importPath

                # Possible file extensions for JS/JSX imports
                # Consider common extensions and directory imports
                $possiblePaths = @(
                    "$fullImportPathCandidate", # For direct file names without extension like 'file.js'
                    "$fullImportPathCandidate.js",
                    "$fullImportPathCandidate.jsx",
                    "$fullImportPathCandidate/index.js",
                    "$fullImportPathCandidate/index.jsx"
                )

                $found = $false
                foreach ($p in $possiblePaths) {
                    # Check if the path points to an existing directory
                    if (Test-Path -Path $p -PathType Container) {
                        # If it's a directory, assume "index.js" or "index.jsx" implicitly
                        if (Test-PathCaseSensitive (Join-Path $p "index.js") -or Test-PathCaseSensitive (Join-Path $p "index.jsx")) {
                            $found = $true
                            break
                        }
                    }
                    elseif (Test-Path -Path $p -PathType Leaf) {
                        # If it's a file, check its casing
                        if (Test-PathCaseSensitive $p) {
                            $found = $true
                            break
                        }
                    }
                }

                if (-not $found) {
                    $errors += "$($file.FullName): Import path casing or file not found: '$importPath'"
                }
            }
        }
    }
}

if ($errors.Count -eq 0) {
    Write-Host "✅ All import paths exist with correct casing."
}
else {
    Write-Host "❌ Found import path errors:`n"
    $errors | ForEach-Object { Write-Host $_ }
    exit 1
}