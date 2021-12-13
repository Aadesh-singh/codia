{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); 
                },
                error: function(error){
                    console.log(error);
                }
            });
        });
    }

    // method to create a Post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <div class="post-parent">
                <small>
                    <span>${ post.user.name }</span>
                    <span class="dateTime">
                        
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash-alt"></i></a>
                        ${ post.createdAt.toString().substring(0, 24)}
                    </span>
                 </small>
                 ${ post.content }
            </div>
            <div class="comment-container">
                <ul id="post-comment-${ post._id}">
                    
                </ul>
            </div>

            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to Add Comment..." required>
                <input type="hidden" name="post" value="${ post._id}">
                <input type="submit" value="Comment">
            </form>
        </p>
    </li>`)
    }


    // Method to delete a Post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log('error', error.responseText);
                }
            })
        })
    }

    createPost();
}