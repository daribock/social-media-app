import React from 'react';
import { Typography, Button, Menu, MenuHandler, Avatar, MenuList, MenuItem } from '@material-tailwind/react';
import { PowerIcon } from '@heroicons/react/24/solid';
import { User } from '../../../../../__generated__/graphql';
import { useAuth } from '../../../../../context/auth';

// TODO: Add the option to update user profile and have a proile page with created posts

enum ProfileMenuEnum {
    MyProfile = 'MY_PROFILE',
    EditProfile = 'EDIT_PROFILE',
    SignOut = 'SIGN_OUT',
}

interface ProfileMenuProps {
    userData: User;
}

const ProfileMenu = ({ userData }: ProfileMenuProps) => {
    const { logout } = useAuth();
    // const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const profileMenuItems = [
        // {
        //     value: ProfileMenuEnum.MyProfile,
        //     label: 'My Profile',
        //     icon: UserCircleIcon,
        //     href: '/profile',
        // },
        // {
        //     value: ProfileMenuEnum.EditProfile,
        //     label: 'Edit Profile',
        //     icon: Cog6ToothIcon,
        // },
        {
            value: ProfileMenuEnum.SignOut,
            label: 'Sign Out',
            icon: PowerIcon,
            danger: true,
        },
    ];

    const handleMenuClick = (value: ProfileMenuEnum) => {
        if (value === ProfileMenuEnum.SignOut) {
            logout();
        }

        // else if (value === ProfileMenuEnum.EditProfile) {
        //     navigate('/profile/edit');
        // } else {
        //     navigate('/profile');
        // }

        setIsMenuOpen(false);
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button variant="text" color="blue-gray" className="rounded-full p-0.5">
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt={userData.username}
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ value, label, icon, danger }) => {
                    return (
                        <MenuItem
                            key={value}
                            onClick={() => handleMenuClick(value)}
                            className={`flex items-center gap-2 rounded ${
                                danger ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${danger ? 'text-red-500' : ''}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={danger ? 'red' : 'inherit'}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;
