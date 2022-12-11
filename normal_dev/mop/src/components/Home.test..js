import Home from "./Home"
import {renderHook} from '@testing-library/react-hooks';

const {result}= renderHook(() => Home())