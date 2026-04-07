for ($i=1; $i -le 5; $i++) {
    $folderName = "talknik-site-$i"
    New-Item -ItemType Directory -Force -Path ".\$folderName"
    Copy-Item -Path ".\index.html" -Destination ".\$folderName\index.html"
    Write-Host "Created: $folderName with index.html" -ForegroundColor Cyan
}
