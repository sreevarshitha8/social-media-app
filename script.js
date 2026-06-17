async function createPost(){

    const text = document.getElementById("postText").value;

    await fetch("/addPost",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text})
    });

    document.getElementById("postText").value="";

    loadPosts();u
}

async function loadPosts(){

    const response = await fetch("/posts");
    const posts = await response.json();

    let output = "";

    posts.forEach((post,index)=>{

       output += `
<div class="post">

<div class="post-header">
<img src="https://i.pravatar.cc/150?img=5">
<h4>Varshitha</h4>
</div>

<p>${post.text}</p>

<div class="actions">
<button class="like-btn"
onclick="likePost(${index})">
❤️ ${post.likes}
</button>
</div>

<input
class="comment-input"
id="comment${index}"
placeholder="Add comment">

<button onclick="addComment(${index})">
Comment
</button>

<ul>
${post.comments.map(c =>
`<li>${c}</li>`).join("")}
</ul>

</div>
`;
    });

    document.getElementById("posts").innerHTML = output;
}

async function likePost(id){

    await fetch(`/like/${id}`,{
        method:"POST"
    });

    loadPosts();
}

async function addComment(id){

    const comment =
    document.getElementById(`comment${id}`).value;

    await fetch(`/comment/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({comment})
    });

    loadPosts();
}

loadPosts();