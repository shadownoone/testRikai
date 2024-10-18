import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from './PostForm/index';
import PostList from './PostList/index';

function BlogPost() {
    const [submittedPosts, setSubmittedPosts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState('newest');

    const navigate = useNavigate();

    const handleSubmit = (postData) => {
        if (editIndex !== null) {
            const updatedPosts = [...submittedPosts];
            updatedPosts[editIndex] = postData;
            setSubmittedPosts(updatedPosts);
            setEditIndex(null);
        } else {
            setSubmittedPosts([postData, ...submittedPosts]);
        }

        setIsFormVisible(false);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setIsFormVisible(true);
    };

    const handleDelete = (index) => {
        const updatedPosts = submittedPosts.filter((_, i) => i !== index);
        setSubmittedPosts(updatedPosts);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setEditIndex(null);
    };

    const sortPosts = (posts, order) => {
        return posts.sort((a, b) => {
            const dateA = new Date(a.published_at);
            const dateB = new Date(b.published_at);
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    const sortedPosts = sortPosts([...submittedPosts], sortOrder);

    const handlePostClick = (post, index) => {
        navigate(`/post/${index}`, { state: post });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2>Danh sách bài đăng</h2>
                    <button className="btn btn-success mb-4" onClick={toggleFormVisibility}>
                        {isFormVisible ? 'Ẩn Form Đăng Bài' : 'Tạo Bài Mới'}
                    </button>
                </div>
            </div>

            {/* Sắp xếp theo thời gian*/}
            <div className="row mb-3">
                <div className="col-md-12 text-center">
                    <label className="me-2">Sắp xếp:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="form-select w-auto d-inline"
                    >
                        <option value="newest">Mới nhất trước</option>
                        <option value="oldest">Cũ nhất trước</option>
                    </select>
                </div>
            </div>

            {/* Form thêm và sửa */}
            {isFormVisible && (
                <PostForm
                    onSubmit={handleSubmit}
                    editIndex={editIndex}
                    postData={editIndex !== null ? submittedPosts[editIndex] : null}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            {/* Form Events */}
            <PostList posts={sortedPosts} onEdit={handleEdit} onDelete={handleDelete} onPostClick={handlePostClick} />
        </div>
    );
}

export default BlogPost;
