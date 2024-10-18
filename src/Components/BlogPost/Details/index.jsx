import { useLocation } from 'react-router-dom';
import { formatDateTime } from '../../../utils/formatDate';

function Details() {
    const location = useLocation();
    const { title, content, published_at } = location.state || {};
    // Deploy

    return (
        <div className="container mt-5">
            <h2>Chi tiết bài đăng</h2>
            {title ? (
                <div className="card">
                    <div className="card-body">
                        <h3>{title}</h3>
                        <p>{content}</p>
                        <p>
                            <strong>Thời gian đăng:</strong> {formatDateTime(published_at)}
                        </p>
                    </div>
                </div>
            ) : (
                <p>Bài viết không tồn tại hoặc không có dữ liệu.</p>
            )}
        </div>
    );
}

export default Details;
