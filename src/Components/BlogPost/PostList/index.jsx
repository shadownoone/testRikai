/* eslint-disable react/prop-types */
import PostCard from '../PostCard/index';

// eslint-disable-next-line react/prop-types
function PostList({ posts, onEdit, onDelete, onPostClick }) {
    return (
        <div className="row">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <PostCard
                        key={index}
                        post={post}
                        onClick={() => onPostClick(post, index)}
                        onEdit={() => onEdit(index)}
                        onDelete={() => onDelete(index)}
                    />
                ))
            ) : (
                <div className="col-md-12 text-center">
                    <p>Chưa có bài viết nào được đăng.</p>
                </div>
            )}
        </div>
    );
}

export default PostList;
