import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BlogPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [errors, setErrors] = useState({});
    const [submittedPosts, setSubmittedPosts] = useState([]); // List of posts
    const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility
    const [editIndex, setEditIndex] = useState(null); // Index of post being edited

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Tiêu đề không được trống';
        if (!content) newErrors.content = 'Nội dung không được trống';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const postData = {
            title,
            content,
            published_at: publishedAt || 'Không có thời gian đăng', // Optional published_at
        };

        if (editIndex !== null) {
            // If in edit mode, update the post
            const updatedPosts = [...submittedPosts];
            updatedPosts[editIndex] = postData;
            setSubmittedPosts(updatedPosts);
            setEditIndex(null); // Reset edit index after updating
        } else {
            // Add a new post
            setSubmittedPosts([postData, ...submittedPosts]);
        }

        // Reset form and hide it after submission
        setTitle('');
        setContent('');
        setPublishedAt('');
        setErrors({});
        setIsFormVisible(false);
    };

    const handleEdit = (index) => {
        // Populate form with the post data to edit
        const post = submittedPosts[index];
        setTitle(post.title);
        setContent(post.content);
        setPublishedAt(post.published_at !== 'Không có thời gian đăng' ? post.published_at : '');
        setIsFormVisible(true);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        // Remove the post from the list
        const updatedPosts = submittedPosts.filter((_, i) => i !== index);
        setSubmittedPosts(updatedPosts);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setEditIndex(null); // Reset edit index if form is toggled off
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

            {/* Form for creating/editing a post */}
            {isFormVisible && (
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="mb-4">
                                    {editIndex !== null ? 'Chỉnh Sửa Bài Viết' : 'Đăng Bài Viết Mới'}
                                </h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Tiêu đề
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            id="title"
                                            placeholder="Nhập tiêu đề"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">
                                            Nội dung
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                            id="content"
                                            rows="4"
                                            placeholder="Nhập nội dung"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                        {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="publishedAt" className="form-label">
                                            Thời gian đăng
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="publishedAt"
                                            value={publishedAt}
                                            onChange={(e) => setPublishedAt(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        {editIndex !== null ? 'Lưu Chỉnh Sửa' : 'Đăng Bài'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* List of submitted posts */}
            {submittedPosts.length > 0 ? (
                <div className="row">
                    {submittedPosts.map((post, index) => (
                        <div className="col-md-6 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    <p className="text-muted">
                                        <strong>Thời gian đăng:</strong> {post.published_at}
                                    </p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>
                                        Chỉnh Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>Chưa có bài viết nào được đăng.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogPost;
