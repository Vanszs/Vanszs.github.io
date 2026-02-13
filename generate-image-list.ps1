# PowerShell script to generate image list for gallery
# Run this script whenever you add new images to the img folder

$imgFolder = "img"
$outputFile = "assets/js/image-list.js"

# Get all image files from img folder
$imageFiles = Get-ChildItem -Path $imgFolder -File | Where-Object { 
    $_.Extension -match '\.(jpg|jpeg|png|webp|gif|svg)$' 
} | Sort-Object Name

# Generate JavaScript array
$jsContent = @"
// Auto-generated image list
// Run generate-image-list.ps1 to update this file

window.GALLERY_IMAGES = [
"@

foreach ($file in $imageFiles) {
    $jsContent += "`n  `"$($file.Name)`","
}

# Remove trailing comma and close array
$jsContent = $jsContent.TrimEnd(',')
$jsContent += @"

];

console.log('Loaded ' + window.GALLERY_IMAGES.length + ' images from auto-generated list');
"@

# Write to file
$jsContent | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "Generated image list with $($imageFiles.Count) images:"
foreach ($file in $imageFiles) {
    Write-Host "  - $($file.Name)"
}
Write-Host ""
Write-Host "Image list saved to: $outputFile"
Write-Host "Total images: $($imageFiles.Count)"
