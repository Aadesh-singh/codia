{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"POST",url:"/posts/create",data:t.serialize(),success:function(t){console.log(t);let o=e(t.data.post);$("#post-container>ul").prepend(o),n($(" .delete-post-button",o)),$("#new-post-form")[0].reset(),new PostComments(t.data.post._id),new ToggleLike($(" .like",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n        <p>\n            <div class="post-parent">\n                <small>\n                    <span>${t.user.name}</span>\n                    <span class="dateTime">\n                        \n                        <a class="delete-post-button" href="/posts/destroy/${t._id}"><i class="fas fa-trash-alt"></i></a>\n                        ${t.createdAt.toString().substring(0,24)}\n                    </span>\n                 </small>\n                 ${t.content}\n            </div>\n            <a id="like-${t._id}" data-likes="0" class="like" href="/likes/toggle/?id=${t._id}&type=Post">\n                <i class="fas fa-thumbs-up"></i> 0 Like\n            </a>\n            <div class="comment-container">\n                <ul id="post-comment-${t._id}">\n                    \n                </ul>\n            </div>\n\n            <form action="/comments/create" id="post-${t._id}-comments-form" method="POST">\n                <input type="text" name="content" placeholder="Type Here to Add Comment..." required>\n                <input type="hidden" name="post" value="${t._id}">\n                <input type="submit" value="Comment">\n            </form>\n        </p>\n    </li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){console.log(t),$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log("error",t.responseText)}})}))},o=function(){$("#post-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}