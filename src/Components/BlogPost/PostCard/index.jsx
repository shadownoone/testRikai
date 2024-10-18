import { formatDateTime } from '../../../utils/formatDate';

/* eslint-disable react/prop-types */
function PostCard({ post, onEdit, onDelete, onClick }) {
    return (
        <div className="col-md-6 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tiêu đề: {post.title}</h5>
                    <p className="card-text">Nội dung: {truncateContent(post.content)}</p>
                    <p className="text-muted">
                        <strong>Thời gian đăng:</strong> {formatDateTime(post.published_at)}
                    </p>
                    <button className="btn btn-primary me-2" onClick={onClick}>
                        Xem Chi Tiết
                    </button>
                    <button className="btn btn-warning me-2" onClick={onEdit}>
                        Chỉnh Sửa
                    </button>
                    <button className="btn btn-danger" onClick={onDelete}>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}

const truncateContent = (content) => {
    if (content.length <= 100) return content;
    return content.substring(0, 100) + '...';
};

export default PostCard;
