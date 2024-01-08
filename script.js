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
        reply: [{
          id: "3",
          name: "Muhammed Yaseen",
          comment:
            "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
          picture: "https://randomuser.me/api/portraits/men/36.jpg",
          reply: [],
        },],
      },
      {
        id: "3",
        name: "Rishal",
        comment:
          "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
        picture: "https://randomuser.me/api/portraits/men/46.jpg",
        reply: [],
      },
    ],
  },
  {
    id: "5",
    name: "David bro",
    comment:
      "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
    picture: "https://randomuser.me/api/portraits/men/26.jpg",
    reply: [],
  },
];
const populateComment = (comment,parentElement, type = "comment") => {
  const commentWrapper = document.createElement("div");

  if (type == "comment") {
    commentWrapper.classList.add("comment-wrapper");
  } else {
    commentWrapper.classList.add("reply-wrapper");
  }
  const commentElement = document.createElement("div");

  if (type == "comment") {
    commentElement.classList.add("comment");
  } else {
    commentElement.classList.add("reply", "comment");
  }

  commentElement.innerHTML = `<div class="comment">
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
         ${type != "reply" ? '<a href="#">Reply</a><div class="divider"></div>' : ""}
         
         
         <span class="is-mute">2 min</span>
     </div>
 </div>`;
  commentWrapper.appendChild(commentElement);
  if (comment.reply.length > 0) {
    populateArrayComments(comment.reply, commentWrapper, "reply");
  }
  parentElement.appendChild(commentWrapper);
};

const populateArrayComments = (comments, parentElement, type = "comment") => {
  comments.forEach((comment)=>{populateComment(comment,parentElement,type)});
};

let allcommentDiv = document.querySelector(".all-comments");
populateArrayComments(comments, allcommentDiv);
