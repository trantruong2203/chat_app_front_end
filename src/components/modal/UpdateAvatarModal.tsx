import { Modal, message, Upload, Button } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../../config/CloudinaryConfig';
import { updateAvatar } from '../../features/users/userApi';
import { toast } from 'react-toastify';
import { updateAvatarThunk } from '../../features/users/userThunks';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../stores/store';
import type { UserResponse } from '../../interface/UserResponse';



type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const UpdateAvatarModal: React.FC<{ 
  openUpdateAvatar: boolean, 
  setOpenUpdateAvatar: (open: boolean) => void, 
  user: UserResponse | null,
  setUser: (user: UserResponse | null) => void
}> = ({ 
  openUpdateAvatar, 
  setOpenUpdateAvatar, 
  user,
  setUser
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();
  const handleCancel = () => {
    setOpenUpdateAvatar(false);
    setImageUrl(undefined);
  };

  const handleSaveAvatar = async () => {
    if (!imageUrl) {
      toast.error('Vui lòng chọn ảnh trước khi lưu!');
      return;
    }

    try {
      setLoading(true);
      // Gọi API cập nhật avatar
      await updateAvatar(imageUrl);
      // Cập nhật state user với thông tin mới
      await dispatch(updateAvatarThunk(imageUrl)).unwrap();
      if (user) {
        setUser({
          ...user,
          avatar: imageUrl
        });
      }
      setImageUrl(undefined);
      toast.success('Cập nhật ảnh đại diện thành công!');
      setOpenUpdateAvatar(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật ảnh đại diện:', error);
      toast.error('Cập nhật ảnh đại diện thất bại. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = async (options: any) => {
    const { file } = options;
    setLoading(true);

    try {
      // Upload lên Cloudinary
      const url = await uploadImageToCloudinary(file, 'chat_app_avatars');
      setImageUrl(url);
      toast.success('Tải ảnh lên thành công!');
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error);
      toast.error('Tải ảnh lên thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </button>
  );

  return (
    <>
      <Modal
        title="Cập nhật ảnh đại diện"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openUpdateAvatar}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={handleUpload}
          >
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="avatar" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : uploadButton}
          </Upload>
        </div>

        <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '20px', gap: '10px'}}>
          <Button type="primary" onClick={handleSaveAvatar} disabled={!imageUrl || loading}>Lưu</Button>
          <Button type="primary" danger onClick={handleCancel}>Hủy</Button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateAvatarModal;