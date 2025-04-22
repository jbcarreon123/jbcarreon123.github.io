yt-dlp -x -f ba \
    --embed-metadata \
    --embed-thumbnail \
    --convert-thumbnails jpg \
    --exec-before-download "ffmpeg -i %(thumbnails.-1.filepath)q -vf crop=\"'if(gt(ih,iw),iw,ih)':'if(gt(iw,ih),ih,iw)'\" _%(thumbnails.-1.filepath)q" \
    --exec-before-download "rm %(thumbnails.-1.filepath)q" \
    --exec-before-download "cp _%(thumbnails.-1.filepath)q %(thumbnails.-1.filepath)q" \
   $URL