'use strict'

import { onLoad } from './app';
import { $on } from './helpers';

$on(window, 'load', onLoad)
$on(window, 'hashchange', onLoad)

