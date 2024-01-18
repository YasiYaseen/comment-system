
class User {
  constructor(name, picture) {
    // this.userid = userid;
    this.name = name;
    this.picture = picture;
  }
  commentObject(comment) {
    return {
      id: "1111",
      name: this.name,
      comment: comment,
      picture: this.picture,
      reply: [],
    };
  }
}



let allcommentDiv = document.querySelector(".all-comments");


$.ajax({
  type: "POST",
  url: "getComments.php",
  data: {
    type: "allComments",
  },
  dataType: "json",
  success: function (response) {
    populateArrayComments(response, allcommentDiv, "comment");
  },
});

function getClosest(element, className) {
  while (
    (element = element.parentElement) &&
    !element.classList.contains(className)
  );
  return element;
}

window.onload = function () {
  var replyButtons = document.querySelectorAll(".reply-link");

  replyButtons.forEach(function (replyButton) {
    replyButton.addEventListener("click", function (e) {
      e.preventDefault();
      let commentDiv = getClosest(e.target, "comment-wrapper");
      let commentId = commentDiv.id;
      createReplyBox(commentDiv);
    });
  });
};

const createReplyBox = (commentDiv) => {
  // top parent (writing)
  let replyBox = document.createElement("div");
  replyBox.classList.add("writing");

  // text input box
  const textareaDiv = document.createElement("div");
  textareaDiv.setAttribute("contenteditable", "true");
  textareaDiv.classList.add("textarea");
  textareaDiv.setAttribute("autofocus", "");
  textareaDiv.setAttribute("spellcheck", "false");
  replyBox.appendChild(textareaDiv);

  // text format
  const textFormat = document.createElement("div");
  textFormat.classList.add("text-format");
  textFormat.innerHTML = `<button class="btn"><i class="ri-bold"></i></button>
  <button class="btn"><i class="ri-italic"></i></button>
  <button class="btn"><i class="ri-underline"></i></button>
  <button class="btn"><i class="ri-list-unordered"></i></button>`;

  // send button
  const sendButtonDiv = document.createElement("div");
  sendButtonDiv.classList.add("group-button");
  sendButtonDiv.innerHTML = `<button class="btn"><i class="ri-at-line"></i></button>
  <button class="btn primary">Send</button>`;

  // const footer
  const footer = document.createElement("div");
  footer.classList.add("footer");
  footer.appendChild(textFormat);
  footer.appendChild(sendButtonDiv);
  replyBox.appendChild(footer);

  commentDiv.insertBefore(replyBox, commentDiv.firstChild.nextSibling);

  replyBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  // reply send
  sendButtonDiv.addEventListener("click", function (e) {
    e.stopPropagation();
    if (textareaDiv.innerText != "") {
      let comment = user.commentObject(textareaDiv.innerText);
      let replydiv = populateComment(comment, commentDiv, "reply");
      if(user.name!=''){
        addComment(textareaDiv.innerText,commentDiv.id,function (response){
          if(response.status=='success'){
            console.log('succees');
            replydiv.id=response.commentId;
            replyBox.remove();
            textareaDiv.innerText='';
          }else{
            console.log('no succeeess');
            commentDiv.removeChild(reply);
          }
        });
        
      }else{
        storeCommentToLocal(textareaDiv.innerText,commentDiv.id);
        console.log('stored to local');
        getFromLocalStorage()
        window.location.href = 'login.php';

      }
      
    }
  });

  document.body.addEventListener("mousedown", function (e) {
    if (replyBox && !replyBox.contains(e.target)) {
      replyBox.remove();
    }
  });
};


// add comments 
const addComment = (comment,parentId = null,callback) => {
  let responseObj;

  $.ajax({
    type: "POST",
    url: "storeComments.php",
    data: {
      comment: comment,
      parentId: parentId,
    },
    dataType: "json",
    success: function (response) {
      if (response[0] === "1") {
        callback({
          status:"success",
          commentId:response[2],
        })
      } else {
        callback({
          status:'fail',
        })
      }
    },
    error: function (xhr, status, erroro) {
      callback({
        status:'error',
        error:erroro
      })
      
    },
  });

};

//populate single comment in ui
const populateComment = (comment, parentElement, type = "comment") => {
  const commentWrapper = document.createElement("div");
  commentWrapper.id = comment.id;
  commentWrapper.classList.add("comment-wrapper");

  const commentElement = document.createElement("div");

  if (type == "comment") {
    commentElement.classList.add("comment");
  } else {
    commentElement.classList.add("reply", "comment");
  }

  commentElement.innerHTML = `
     <div class="user-banner">
         <div class="user">
             <div class="avatar" style="background-color:#fff5e9;border-color:#ffe0bd; color:#F98600">
             <img src="${comment.picture}"
             alt="">
                 <span class="stat green"></span>
             </div>
             <h5>${comment.name}</h5>
         </div>
         <button class="btn dropdown"><i class="ri-more-line"></i></button>
     </div>
     <div class="content">
         <p>${comment.comment}
         </p>
     </div>
     <div class="footer">
         <button class="btn"><i class="ri-emotion-line"></i></button>
         <div class="divider"></div>
         ${
           type != "reply"
             ? '<a href="#" class="reply-link">Reply</a><div class="divider"></div>'
             : ""
         }
         
         
         <span class="is-mute">2 min</span>
     </div>
`;
  commentWrapper.appendChild(commentElement);
  if (comment.reply.length > 0) {
    populateArrayComments(comment.reply, commentWrapper, "reply");
  }
  if(type=='comment'){
parentElement.insertBefore(commentWrapper,parentElement.firstChild)
  }else{
      parentElement.appendChild(commentWrapper);

  }
  return commentWrapper;
};

// populate array comments
const populateArrayComments = (comments, parentElement, type = "comment") => {
  comments.forEach((comment) => {
    populateComment(comment, parentElement, type);
  });
};

// store To  Local storage
const storeCommentToLocal = (comment,parentId)=>{
let commentObj ={
  comment:comment,
  parentId:parentId
}
let commentString = JSON.stringify(commentObj);
localStorage.setItem('pendingComment',commentString);
}

const getFromLocalStorage=()=>{
  let commentString =localStorage.getItem('pendingComment');
  if(commentString){
    comment = JSON.parse(commentString);
    let parentDiv;
    let type;
    if(comment.parentId ==null){
      parentDiv = document.querySelector('.all-comments');
      type='comment';
    }else{
      parentDiv=document.getElementById(comment.parentId);
      type='reply';
    }
    
  commentObj =user.commentObject(comment.comment);
   let commentDiv = populateComment(commentObj,parentDiv,type);

    addComment(comment.comment,comment.parentId,(response)=>{
      if(response.status=='success'){
        commentDiv.id=response.commentId;
      }else{
        commentDiv.remove();
      }
    });
    localStorage.removeItem('pendingComment');
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  getFromLocalStorage()
})
