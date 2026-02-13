@echo off
echo Generating image list for gallery...
echo.

set "imgFolder=img"
set "outputFile=assets\js\image-list.js"

echo // Auto-generated image list > "%outputFile%"
echo // Run update-images.bat to regenerate this file >> "%outputFile%"
echo. >> "%outputFile%"
echo window.GALLERY_IMAGES = [ >> "%outputFile%"

set count=0
for %%f in ("%imgFolder%\*.jpg" "%imgFolder%\*.jpeg" "%imgFolder%\*.png" "%imgFolder%\*.webp" "%imgFolder%\*.gif" "%imgFolder%\*.svg") do (
    set /a count+=1
    echo   "%%~nxf", >> "%outputFile%"
    echo   - %%~nxf
)

echo ]; >> "%outputFile%"
echo. >> "%outputFile%"
echo console.log('Loaded ' + window.GALLERY_IMAGES.length + ' images from auto-generated list'); >> "%outputFile%"

echo.
echo Generated image list with %count% images
echo Saved to: %outputFile%
echo.
echo Gallery will now display all images automatically!
pause
