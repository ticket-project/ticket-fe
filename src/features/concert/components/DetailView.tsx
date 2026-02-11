/// 파일 위치 및 분리 다시 확읺하기
import { ConcertDetail } from '../types';

const DetailView = ({ data }: { data: ConcertDetail }) => {
  return <div>{data.title}</div>;
};

export default DetailView;
