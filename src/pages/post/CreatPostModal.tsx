import React, { useContext } from 'react';
import { Modal, Input, Button, Upload, Image, type UploadFile } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { PictureOutlined, SmileOutlined, GlobalOutlined, DeleteOutlined } from '@ant-design/icons';
import { getPostImages, sendPostImageThunk } from '../../features/postImg/postImgThunks';
import { getPosts, sendPostThunk } from '../../features/post/postThunks';
import type { Post as PostType } from '../../interface/UserResponse';
import { uploadImageToCloudinary } from '../../config/CloudinaryConfig';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../stores/store';
import { getObjectById } from '../../services/respone';
import { ContextAuth } from '../../contexts/AuthContext';


interface CreatPostModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    confirmLoading: boolean;
    setConfirmLoading: (confirmLoading: boolean) => void;
    setNewPostContent: (newPostContent: string) => void;
    newPostContent: string;
    selectedImages: File[];
    setSelectedImages: (images: File[]) => void;
    uploadFileList: UploadFile[];
    setUploadFileList: (files: UploadFile[]) => void;
    previewImages: string[];
    setPreviewImages: (images: string[]) => void;
    handleImageSelect: (info: UploadChangeParam<UploadFile>) => void;
}

const CreatPostModal: React.FC<CreatPostModalProps> = ({
    open,
    setOpen,
    confirmLoading,
    setConfirmLoading,
    setNewPostContent,
    newPostContent,
    selectedImages,
    setSelectedImages,
    uploadFileList,
    setUploadFileList,
    previewImages,
    setPreviewImages,
    handleImageSelect

}) => {
    const { items } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const { accountLogin } = useContext(ContextAuth);
    const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;

    const handleOk = () => {
        setConfirmLoading(true);
        handlePostSubmit();
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setNewPostContent('');
            setSelectedImages([]);
            setPreviewImages([]);
            setUploadFileList([]);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
        setNewPostContent('');
        setSelectedImages([]);
        setPreviewImages([]);
        setUploadFileList([]);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviewImages = previewImages.filter((_, i) => i !== index);
        const newUploadFileList = uploadFileList.filter((_, i) => i !== index);
        setSelectedImages(newImages);
        setPreviewImages(newPreviewImages);
        setUploadFileList(newUploadFileList);
    };

    const handlePostSubmit = async () => {
        if (!newPostContent.trim() && selectedImages.length === 0) return;

        try {
            // Tạo bài viết trước
            const newPost = {
                id: 0,
                userid: currentUserId ?? 0,
                content: newPostContent,
                createdat: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                status: 1
            };
            const postResult = await dispatch(sendPostThunk(newPost as PostType)).unwrap();
            const postId = postResult.data?.id || 0;

            // Upload tất cả ảnh nếu có
            if (selectedImages.length > 0) {
                const uploadPromises = selectedImages.map(async (image, index) => {
                    try {
                        const imageUrl = await uploadImageToCloudinary(image, 'post_images');
                await dispatch(sendPostImageThunk({ postid: postId, imgurl: imageUrl })).unwrap();
                        console.log(`Ảnh ${index + 1} đã được upload thành công`);
                        return true; // Thành công
                    } catch (uploadError) {
                        console.error(`Lỗi khi upload ảnh ${index + 1}:`, uploadError);
                        return false; // Thất bại
                    }
                });

                // Chờ tất cả ảnh upload xong và kiểm tra kết quả
                const results = await Promise.allSettled(uploadPromises);
                const successCount = results.filter(result => 
                    result.status === 'fulfilled' && result.value === true
                ).length;
                
                console.log(`Đã upload thành công ${successCount}/${selectedImages.length} ảnh`);
                
                // Đợi một chút để đảm bảo database đã cập nhật
                if (successCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }

            // Reset form
            setNewPostContent('');
            setSelectedImages([]);
            setPreviewImages([]);
            setUploadFileList([]);

            // Refresh data - đảm bảo load lại toàn bộ posts và images
            await dispatch(getPosts()).unwrap();
            
            // Đợi thêm một chút rồi load lại images cho bài viết mới
            if (postId > 0) {
                setTimeout(() => {
                dispatch(getPostImages(postId));
                }, 300);
            }
        } catch (error) {
            console.error("Lỗi khi đăng bài viết:", error);
            // Có thể thêm thông báo lỗi cho người dùng ở đây
        }
    };

    return (
        <>

            <Modal
                title="Tạo bài viết"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Input.TextArea
                    placeholder="Bạn đang nghĩ gì thế?"
                    autoSize={{ minRows: 3, maxRows: 10 }}
                    style={{ marginBottom: 16 }}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />

                {/* Hiển thị ảnh đã chọn */}
                {selectedImages.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {selectedImages.map((file, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                    <Image
                                        src={previewImages[index] || (file instanceof File ? URL.createObjectURL(file) : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+')}
                                        alt={`Selected ${index}`}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: 'cover', borderRadius: 8 }}
                                    />
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        style={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 4,
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: 24,
                                            height: 24,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onClick={() => handleRemoveImage(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Upload
                        multiple
                        accept="image/*"
                        beforeUpload={() => false}
                        onChange={handleImageSelect}
                        showUploadList={false}
                        fileList={uploadFileList}
                    >
                        <Button type="text" icon={<PictureOutlined style={{ fontSize: '18px', color: '#45bd62' }} />} style={{ flex: 1, borderRadius: '8px', height: '40px' }}>
                            Ảnh/Video
                        </Button>
                    </Upload>
                    <Button type="text" icon={<SmileOutlined style={{ fontSize: '18px', color: '#f7b928' }} />} style={{ flex: 1, borderRadius: '8px', height: '40px' }}>
                        Cảm xúc
                    </Button>
                    <Button type="text" icon={<GlobalOutlined style={{ fontSize: '18px', color: '#1877f2' }} />} style={{ flex: 1, borderRadius: '8px', height: '40px' }}>
                        Vị trí
                    </Button>
                </div>

                <div>
                    {!newPostContent.trim() && selectedImages.length === 0 ? (
                        <Button
                            type="primary"
                            disabled
                            onClick={handleOk}
                            style={{
                                borderRadius: '50px',
                                width: '100%',
                                height: '40px',
                                backgroundColor: '#f0f2f5',
                                color: '#000',
                                fontSize: '15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                marginTop: '10px'
                            }}> Đăng bài viết </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={handleOk}
                            loading={confirmLoading}
                            style={{
                                borderRadius: '50px',
                                width: '100%',
                                height: '40px',
                                backgroundColor: '#1877f2',
                                color: '#fff',
                                fontSize: '15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                marginTop: '10px',
                            }}> Đăng bài viết </Button>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default CreatPostModal;