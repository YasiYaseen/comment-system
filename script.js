let comments = [
  {
    id: "1",
    name: "Floyd Miles",
    comment:
      "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
    picture: "https://randomuser.me/api/portraits/men/86.jpg",
    reply: [],
  },
  {
    id: "2",
    name: "Albert Flores",
    comment:
      "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
    picture: "https://randomuser.me/api/portraits/men/46.jpg",
    reply: [
      {
        id: "3",
        name: "Muhammed Yaseen",
        comment:
          "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
        picture: "https://randomuser.me/api/portraits/men/36.jpg",
        reply: [
          {
            id: "4",
            name: "Muhammed Yaseen",
            comment:
              "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
            picture: "https://randomuser.me/api/portraits/men/36.jpg",
            reply: [],
          },
        ],
      },
      {
        id: "5",
        name: "Rishal",
        comment:
          "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
        picture: "https://randomuser.me/api/portraits/men/46.jpg",
        reply: [],
      },
    ],
  },
  {
    id: "6",
    name: "David bro",
    comment:
      "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
    picture: "https://randomuser.me/api/portraits/men/26.jpg",
    reply: [],
  },
];
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
  parentElement.appendChild(commentWrapper);
  return commentWrapper;
};

const populateArrayComments = (comments, parentElement, type = "comment") => {
  comments.forEach((comment) => {
    populateComment(comment, parentElement, type);
  });
};

let allcommentDiv = document.querySelector(".all-comments");
// populateArrayComments(comments, allcommentDiv);

// let newcomment={
//   id: "1",
//   name: "Floyd not Miles",
//   comment:
//     "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
//   picture: "https://randomuser.me/api/portraits/men/86.jpg",
//   reply: [],
// };
// let newDiv=populateComment(newcomment,allcommentDiv,type='comment');
// allcommentDiv.removeChild(newDiv)

$.ajax({
  type: "POST",
  url: "getComments.php",
  data: {
    test: "hi",
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


const createReplyBox =(commentDiv)=>{
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
  const textFormat = document.createElement('div');
  textFormat.classList.add('text-format');
  textFormat.innerHTML=`<button class="btn"><i class="ri-bold"></i></button>
  <button class="btn"><i class="ri-italic"></i></button>
  <button class="btn"><i class="ri-underline"></i></button>
  <button class="btn"><i class="ri-list-unordered"></i></button>`;

  // send button 
  const sendButtonDiv = document.createElement("div");
  sendButtonDiv.classList.add("group-button");
  sendButtonDiv.innerHTML = `<button class="btn"><i class="ri-at-line"></i></button>
  <button class="btn primary">Send</button>`;

  // const footer 
  const footer=document.createElement('div');
  footer.classList.add('footer')
  footer.appendChild(textFormat);
  footer.appendChild(sendButtonDiv);
  replyBox.appendChild(footer)

  commentDiv.appendChild(replyBox);

  sendButtonDiv.addEventListener("click", function () {
    console.log("hi");
  });
}