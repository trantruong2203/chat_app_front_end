 # Hướng Dẫn Responsive Design cho Mobile

## Tổng Quan

Ứng dụng chat đã được thiết kế để hoạt động tốt trên cả desktop và mobile devices. Các tính năng responsive bao gồm:

- **Mobile-first approach**: Thiết kế ưu tiên cho mobile trước
- **Responsive breakpoints**: Hỗ trợ nhiều kích thước màn hình
- **Touch-friendly**: Tối ưu cho thiết bị cảm ứng
- **Mobile navigation**: Thanh điều hướng dưới cùng cho mobile

## Breakpoints

```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }

/* Small mobile */
@media (max-width: 480px) { ... }

/* Landscape mobile */
@media (max-width: 768px) and (orientation: landscape) { ... }
```

## Các Component Responsive

### 1. Navbar
- **Desktop**: Thanh bên trái (80px width)
- **Mobile**: Thanh dưới cùng (60px height)

### 2. RecentChats
- **Desktop**: Cố định bên trái (320px width)
- **Mobile**: Chiếm toàn bộ chiều rộng

### 3. Main Chat Area
- **Desktop**: Chiếm phần còn lại của màn hình
- **Mobile**: Chiếm toàn bộ chiều cao trừ navbar

### 4. Message Bubbles
- **Desktop**: Max-width 70%
- **Mobile**: Max-width 85-90%

## Hooks Responsive

### useResponsive
```typescript
const { isMobile, isTablet, isDesktop, screenWidth, screenHeight, orientation } = useResponsive();
```

### useTouchDevice
```typescript
const isTouchDevice = useTouchDevice();
```

### useMobileBrowser
```typescript
const isMobileBrowser = useMobileBrowser();
```

### useSafeArea
```typescript
const safeArea = useSafeArea();
```

## CSS Classes Responsive

### Layout Classes
- `.mobile-layout`: Container chính cho mobile
- `.mobile-content`: Nội dung chính cho mobile
- `.mobile-navbar`: Navbar cho mobile

### Component Classes
- `.mobile-chat-list`: Danh sách chat cho mobile
- `.mobile-chat-area`: Khu vực chat cho mobile
- `.mobile-message-bubble`: Tin nhắn cho mobile
- `.mobile-input-container`: Khu vực nhập liệu cho mobile

### Utility Classes
- `.mobile-hidden`: Ẩn trên mobile
- `.mobile-visible`: Hiển thị trên mobile
- `.mobile-text-center`: Căn giữa text trên mobile
- `.mobile-full-width`: Chiều rộng 100% trên mobile

## Cách Sử Dụng

### 1. Import Hooks
```typescript
import { useResponsive, useTouchDevice } from '../hooks/useResponsive';
```

### 2. Sử Dụng trong Component
```typescript
const MyComponent = () => {
  const { isMobile, isTablet } = useResponsive();
  const isTouchDevice = useTouchDevice();

  if (isMobile) {
    return <MobileVersion />;
  }

  return <DesktopVersion />;
};
```

### 3. Conditional Rendering
```typescript
return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
    <Content />
  </div>
);
```

### 4. CSS Media Queries
```css
.my-component {
  /* Desktop styles */
  width: 300px;
  margin: 20px;
}

@media (max-width: 768px) {
  .my-component {
    /* Mobile styles */
    width: 100%;
    margin: 8px;
  }
}
```

## Tối Ưu Hóa Mobile

### 1. Touch Targets
- Tất cả các button phải có kích thước tối thiểu 44x44px
- Sử dụng class `.mobile-touch-target`

### 2. Font Size
- Input fields: 16px (tránh zoom trên iOS)
- Text thường: 14px
- Text nhỏ: 12px

### 3. Spacing
- Padding: 12px-16px
- Margin: 8px-12px
- Gap: 8px-12px

### 4. Colors
- Sử dụng CSS variables để dễ thay đổi theme
- Hỗ trợ dark mode

## Testing Responsive

### 1. Browser DevTools
- Sử dụng Device Toolbar
- Test các breakpoints khác nhau
- Kiểm tra orientation

### 2. Real Devices
- Test trên iPhone/Android thật
- Kiểm tra touch gestures
- Test performance

### 3. Responsive Checker
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Best Practices

### 1. Performance
- Lazy load components không cần thiết
- Optimize images cho mobile
- Minimize bundle size

### 2. Accessibility
- Đảm bảo contrast ratio tốt
- Hỗ trợ screen readers
- Keyboard navigation

### 3. SEO
- Mobile-first indexing
- Fast loading times
- Optimized meta tags

## Troubleshooting

### 1. Layout Issues
- Kiểm tra CSS specificity
- Sử dụng `!important` khi cần thiết
- Test trên nhiều browser

### 2. Touch Issues
- Đảm bảo touch targets đủ lớn
- Test scroll behavior
- Kiểm tra gesture handling

### 3. Performance Issues
- Sử dụng React.memo cho components
- Optimize re-renders
- Lazy load heavy components

## Tài Liệu Tham Khảo

- [Ant Design Mobile](https://mobile.ant.design/)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)