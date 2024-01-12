<?php
include_once 'sqlQueries.php';
$comments = extractRecordAll("comment_id AS id,u.name,comment,imageurl AS picture,parent_comment,IFNULL(JSON_ARRAY(),'' ) AS reply",'comments As c LEFT JOIN users AS u ON c.user_id = u.linkedin_id ');
foreach ($comments as &$comment) {
    $comment['reply']=json_decode($comment['reply'], true);
}
echo json_encode($comments);
