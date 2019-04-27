import dev from './dev';
import prod from './prod';

let result;

if (process.env.NODE_ENV === 'production') {
  result = dev;
} else {
  result = prod;
}

export default result;
