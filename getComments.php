<?php
include_once 'sqlQueries.php';
$comments = extractRecordAll("comment_id AS id,u.name,comment,imageurl AS picture,parent_comment,'' AS reply", 'comments As c LEFT JOIN users AS u ON c.user_id = u.linkedin_id WHERE `parent_comment` IS NULL');

if (is_array($comments)) {
    foreach ($comments as &$comment) {

        $reply = extractRecordAll("comment_id AS id,u.name,comment,imageurl AS picture,parent_comment,'' AS reply", 'comments As c LEFT JOIN users AS u ON c.user_id = u.linkedin_id WHERE `parent_comment` = "' . $comment['id'] . '"');

        if (is_array($reply)) {

            foreach ($reply as &$value) {
                $value['reply'] = json_decode('[]', true);
            }
            $comment['reply'] = $reply;

        } else {
            $comment['reply'] = json_decode('[]', true);
        }



    }
}



echo json_encode($comments);
