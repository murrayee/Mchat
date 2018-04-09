/**
 * Created by bear on 2018/3/2.
 */
import axios from '../config/instance';
import { dynamicApi } from '../config/api';
import qs from 'qs';

export const fetchTopics = async params => {
  return await axios.get(`${dynamicApi.topics}?${qs.stringify(params)}`);
};
export const fetchArticle = async params => {
  return await axios.get(
    `${dynamicApi.article.replace('<id>', params.id)}?${qs.stringify(params)}`
  );
};
