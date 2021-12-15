class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call of existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comment-${postId}`).append(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    // form reset
                    $(`#post-${postId}-comments-form`)[0].reset();
                    new Noty({
                        theme: 'relax',
                        text: 'Comment Added',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment){
        return $(`<li id="comment-${ comment._id }">
        <p>
            <div class="comments-parent">
                <small>
                    <span class="name">${ comment.user.name}</span>
                    <span class="dateTime">
                        
                            <a class="delete-comment-button" href="/comments/destroy/${ comment._id}"><i class="fas fa-trash-alt"></i></a>
                        
                            ${ comment.createdAt.toString().substring(0, 24)}
                    </span>
                </small>
                <div> ${ comment.content} </div>
            </div>
        </p>
    </li>`);
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





}