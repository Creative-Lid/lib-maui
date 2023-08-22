import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';

const LogoIcon = (props: SvgIconProps) => {
    const theme = useTheme();

    return (
        <SvgIcon viewBox='0 0 140 98' {...props}>
            <path
                fill={theme.palette.primary.main}
                d='M126.2,43.8L66.4,5.2L44.8,24.5l-2.4-2.6L66,0.8l62,40L126.2,43.8z M15.8,32.2c0.6-8.7,2.4-15.3,3.9-19.4
	c0.7,0.9,1.3,1.8,2,2.7C30.8,27.3,42.8,36.3,59.5,44c11.8,5.5,41.2,14.2,62.3,16.1c6.8,0.6,12.8,0.9,18.1,1c0.2,2.4,0.2,5,0,7.6
	c-0.8,0-1.7,0.1-2.6,0.1C119,69.3,89.9,66,77.3,61.9C59.9,56.3,45.8,51,33.1,43.8c-7.6-4.4-8.6-5.1-13.9-9
	C18.2,34,17.1,33.2,15.8,32.2z M6.7,44.5c-2.2,2.6-4.7,5.3-6.5,7.3c0.5,4.7,1.8,9.5,3.9,14.1c1.4-1.7,3.1-3.8,4.4-5.5
	c2.4-3.3,5.3-8.2,5.9-9.3c-0.2-2.4-0.4-4.8-0.6-7.3c-0.2-3-0.2-5.7-0.1-8.4C12.1,37.8,9.3,41.5,6.7,44.5z M15.7,43.8
	c0.1,2.4,0.3,4.8,0.6,7.1c1.4,1.1,8.3,6.3,16.5,10.5c13,6.5,27.5,11,45.2,15.6c13.2,3.5,42.8,4.3,60.3,0.1c0.2-0.6,0.3-1.1,0.4-1.7
	c0.4-1.7,0.7-3.3,0.9-4.9c-0.8,0-1.5,0.1-2.3,0.1c-1.3,0-2.7,0.1-4.1,0.1c-18.4,0-44.5-3.2-56.3-7C59.3,57.9,45,52.6,32.2,45.3
	c-7.7-4.4-8.7-5.1-14.1-9.1c-0.7-0.5-1.6-1.2-2.5-1.9C15.5,37.3,15.5,40.4,15.7,43.8z M14.3,75.4c1.9-2.7,3-5,3.4-5.8
	c-1.1-4.7-2.1-9.9-2.8-15.6c-1.2,2.1-3.2,5.1-4.8,7.4c-1.5,2-3.5,4.5-5,6.2c1.9,3.8,4.2,7.4,7,10.8C12.7,77.6,13.5,76.5,14.3,75.4z
	 M99.7,90.3c-1,0-2,0-3,0c-19-0.5-29.6-3.2-36-4.8c-1.3-0.3-2.4-0.6-3.4-0.8c-11.1-2.3-31.5-10.9-37.4-13.4
	c2.4,9.3,5.2,16.3,6.9,20.1c21.8,4.8,42.7,5.9,56.5,5.9c11.7,0,22.9-0.7,32.3-2.1c7.8-1.2,14-2.7,17.3-4.4c0.7-1.3,1.3-2.7,1.9-4
	C123.9,88.6,111,90.3,99.7,90.3z M18.3,72.2c-0.6,1.1-1.5,2.6-2.6,4.2c-0.9,1.3-1.8,2.5-2.6,3.5c3.2,3.7,6.9,7.1,11.1,10
	C22.5,85.9,20.3,79.8,18.3,72.2z M57.7,82.9c1,0.2,2.1,0.5,3.5,0.8c6.3,1.6,16.8,4.2,35.6,4.7c12.3,0.3,26.9-1.6,38.8-3.7
	c0.8-1.9,1.5-3.8,2.1-5.7c-8.2,1.8-18.8,2.6-29.2,2.6c-12.1,0-23.9-1.1-30.9-3C59.7,74,45.2,69.5,32,62.9
	c-6.8-3.4-12.7-7.6-15.5-9.6c0.7,5.8,1.7,11.1,2.8,15.8C22.7,70.6,45.8,80.5,57.7,82.9z M5.4,43.4c3.6-4.3,7.8-9.9,8.6-11.1
	c0.6-8.3,2.2-14.7,3.6-19c-2.4,1.7-5.2,4.3-8,7.8c-3.4,4.4-7.8,11.6-9.3,21.2C0,44.6-0.1,47,0.1,49.4C1.7,47.7,3.6,45.5,5.4,43.4z
	 M84.9,19.2l-3.8,30.6c-4-1.2-7.7-2.4-11-3.5l1.4-15.8c0.3-3.4-2.2-6.4-5.6-6.7c-0.2,0-0.4,0-0.5,0c0,0,0,0,0,0
	c-3.2,0-5.9,2.4-6.1,5.6l-1,12c-4.2-2-8.2-4.2-11.8-6.4l1.3-10.6l18-16.1l1-0.9l1.1,0.7L84.9,19.2z M88.2,21.3l-3.7,29.5
	c11.1,3.2,23.7,6,34.3,7.2l2.1-15.5L88.2,21.3z M69.4,26.5c-0.3-0.4-0.7-0.8-1.2-1.1c-1.9-0.1-3.5,1.3-3.7,3.2l-1.3,15.1
	c0.2,0.1,0.4,0.2,0.6,0.2c2.2,0.9,4.4,1.7,5.5,2.1l1.4-15.6C70.8,29,70.4,27.6,69.4,26.5z M65.2,37.3c-0.4,0-0.7-0.3-0.7-0.7
	c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C65.9,37,65.6,37.3,65.2,37.3z'
            />
        </SvgIcon>
    );
};

export default LogoIcon;
