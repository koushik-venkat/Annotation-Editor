import DrawIcon from '@mui/icons-material/Draw';
import Crop32OutlinedIcon from '@mui/icons-material/Crop32Outlined';
import AnimationOutlinedIcon from '@mui/icons-material/AnimationOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import SaveAltTwoToneIcon from '@mui/icons-material/SaveAltTwoTone';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-state/store';

type ButtonIconProps = {
  title: string;
};

const ButtonIcon = ({ title }: ButtonIconProps) => {
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div>
      {title === 'freehand' ? (
        <DrawIcon
          style={{
            fontSize: '28px',
            paddingRight: '5px',
            paddingBottom: '3px',
          }}
        />
      ) : title === 'line' ? (
        <TimelineOutlinedIcon
          style={{
            fontSize: '28px',
            paddingRight: '5px',
            paddingBottom: '3px',
          }}
        />
      ) : title === 'circle' ? (
        <AnimationOutlinedIcon
          style={{
            fontSize: '28px',
            paddingRight: '5px',
            paddingBottom: '3px',
          }}
        />
      ) : title === 'rectangle' ? (
        <Crop32OutlinedIcon style={{ fontSize: '28px', paddingRight: '2px' }} />
      ) : title === 'erase' ? (
        <AutoFixHighTwoToneIcon
          style={{
            fontSize: '28px',
            paddingRight: '5px',
            paddingBottom: '3px',
          }}
        />
      ) : title === 'pickColor' ? (
        <ColorLensIcon
          style={{
            paddingRight: '5px',
            fontSize: '28px',
          }}
        />
      ) : title === 'save' ? (
        <SaveAltTwoToneIcon
          style={{
            fontSize: '28px',
            paddingRight: '5px',
            paddingBottom: '3px',
          }}
        />
      ) : title === 'clear' ? (
        <DeleteIcon
          style={{
            fontSize: '24px',
            paddingRight: '1.5px',
          }}
        />
      ) : title === 'triangle' ? (
        <ChangeHistoryIcon
          style={{
            fontSize: '24px',
            paddingRight: '1.5px',
            paddingBottom: '1.5px',
          }}
        />
      ) : title === 'select' ? (
        <AdsClickIcon
          style={{
            fontSize: '24px',
            paddingRight: '3px',
            paddingBottom: '1px',
          }}
        />
      ) : currentThemeDark ? (
        <img
          width='30'
          height='30'
          className='mr-1 mt-0.8 w-5'
          src='https://img.icons8.com/ios-filled/50/FFFFFF/ellipse-stroked--v2.png'
        />
      ) : (
        <img
          width='25'
          height='25'
          className='mr-1 mt-0.8 w-5'
          src='https://img.icons8.com/ios-filled/50/ellipse-stroked--v2.png'
          alt='ellipse-stroked--v1'
        />
      )}
    </div>
  );
};

export default ButtonIcon;
