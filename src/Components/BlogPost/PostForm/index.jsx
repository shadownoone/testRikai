/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function PostForm({ onSubmit, editIndex, postData, onCancel }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editIndex !== null && postData) {
            setTitle(postData.title);
            setContent(postData.content);
            setPublishedAt(postData.published_at !== 'Không có thời gian đăng' ? postData.published_at : '');
        } else {
            setTitle('');
            setContent('');
            setPublishedAt('');
        }
    }, [editIndex, postData]);

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
            published_at: publishedAt || 'Không có thời gian đăng',
        };

        onSubmit(postData);

        setErrors({});
        if (onCancel) onCancel();
    };

    return (
        <div className="row justify-content-center mb-4">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h4 className="mb-4">{editIndex !== null ? 'Chỉnh Sửa Bài Viết' : 'Đăng Bài Viết Mới'}</h4>
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
                            <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
                                Hủy
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostForm;
