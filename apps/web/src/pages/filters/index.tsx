import { Layout } from 'antd';

const { Header, Content } = Layout;

interface FiltersPageProps {
  dataSourceId: string;
}

export function FiltersPage(props: FiltersPageProps) {
  // DEBUG CODE
  console.log('FiltersPage props', props);
  return <div>Content - Filters</div>;
}

export default FiltersPage;
