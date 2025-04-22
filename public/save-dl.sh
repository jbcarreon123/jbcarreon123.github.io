yt-dlp -x -f ba \
    --embed-metadata \
    --embed-thumbnail \
    --audio-format mp3 \
    --convert-thumbnails jpg \
    --exec-before-download "ffmpeg -i %(thumbnails.-1.filepath)q -vf crop=\"'if(gt(ih,iw),iw,ih)':'if(gt(iw,ih),ih,iw)'\" art-%(thumbnails.-1.filepath)q" \
    --exec-before-download "rm %(thumbnails.-1.filepath)q" \
    --exec-before-download "cp art-%(thumbnails.-1.filepath)q %(thumbnails.-1.filepath)q" \
    https://music.youtube.com/playlist?list=PLJiNr7HpTYe-PfGB96hQVu504ShqJHQsY