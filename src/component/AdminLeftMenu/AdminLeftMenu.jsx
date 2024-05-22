import './AdminLeftMenu.scss';

const AdminLeftMenu = () => {

    return (
        <div className='admin-menu-left-container'>
            <div className='menu-category item-menu'>
                <p>Quản trị Danh mục</p>
            </div>
            <div className='menu-product item-menu'>
                <p>Quản trị Sự kiện</p>
            </div>
            <div className='menu-bill item-menu'>
                <p>Quản trị Hóa đơn</p>
            </div>
            <div className='menu-user item-menu'>
                <p>Quản trị Người dùng</p>
            </div>
        </div>
    )
};

export default AdminLeftMenu;