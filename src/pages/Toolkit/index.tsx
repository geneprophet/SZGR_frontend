import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getRemoteCoexpression,
  getRemoteCoexpressionLike,
} from '@/pages/Toolkit/service';
import { ApartmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Parser } from 'json2csv';
// @ts-ignore
import { URL_PREFIX, uniqueArray } from '@/common/constants';
import {
  Breadcrumb,
  Col,
  Divider,
  Table,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { AnalysisIcon } from '../../components/Icons/index';
import Network from '@/components/Network';
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  const [coexpression, setCoexpression] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  interface SearchKeywords {
    vid: string | undefined;
    vtype: string | undefined;
    pop: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  }

  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  useEffect(() => {
    if (name) {
      getRemoteCoexpression({
        pageSize: pagesize,
        pageIndex: pageindex,
        vid: undefined,
        vtype: undefined,
        pop: undefined,
        sort_field: undefined,
        sort_direction: undefined,
      }).then((res) => {
        setLoading(false);
        setCoexpression(res.data);

        setTotal(res.meta.total);
      });
    }
  }, [name]);

  const [data, setData] = useState([]);
  // {from: "Immune", to: "Thiamphenicol"}
  const [nodes, setNodes] = useState([]);
  // {color: "orange", marker: {radius: 7}, id: "Vascular"}
  // {color: "red", marker: {radius: 10}, id: "DR00001"}

  return (
    <div>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + '/home'}>
                <strong style={{ fontFamily: 'sans-serif' }}>Home</strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>Toolkit</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col>
          <Network network={coexpression} />
        </Col>
      </Row>
    </div>
  );
}
