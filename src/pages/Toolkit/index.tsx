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
  message,
  Button,
  Select,
  Space,
  Typography, Input
} from "antd";
const {Title,Text} = Typography;
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { AnalysisIcon } from '../../components/Icons/index';
import Network from '@/components/Network';
const { TextArea } = Input;
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

  const [data, setData] = useState([]);
  // {from: "Immune", to: "Thiamphenicol"}
  const [nodes, setNodes] = useState([]);
  const [network,setNetwork] = useState({});
  useEffect(() => {
    getRemoteCoexpression({
      pageSize: 10000,
      pageIndex: pageindex,
      tissue: userinputtissue,
      celltype: userinputcelltype,
      gene: userinputgene,
      sort_field: undefined,
      sort_direction: undefined,
    }).then((res) => {
      // setLoading(false);
      // setCoexpression(res.data);
      // setTotal(res.meta.total);
      // console.log(res.data);
      let nodes = [];
      let edges = [];
      for(let i=0;i<res.data.length;i++){
        let a = {from:res.data[i].source,to:res.data[i].gene,weight:res.data[i].weight};
        edges.push(a);
        let b = {color:'blue',marker: {radius: 7}, id: res.data[i].source}
        let c = {color:'blue',marker: {radius: 7}, id: res.data[i].gene}
        nodes.push(b);
        nodes.push(c);
      }
      console.log(nodes);
      console.log(edges);
      setData(edges);
      setNodes(nodes);
      setNetwork({nodes:nodes,data:edges});
    });
  }, []);
  const [userinputtissue, setUserinputtissue] = useState('Cerebral_Cortex');
  const [userinputcelltype, setUserinputcelltype] = useState('Excitatory_Neuron');
  const [userinputgene, setUserinputgene] = useState('CUL3,RERE,SOX2-OT,MLKL,ALMS1,FLOT1,NIPSNAP1,PPP1R13B,CLCN3,QPCT,ELAC2,MLXIP,DLG4,DGKZ,PCCB,KLC1,CACNA1C,SDCCAG8,TSNARE1');
  const [tissuelist, setTissuelist] = useState([]);
  const [celltypelist, setCelltypelist] = useState([]);

  // {color: "orange", marker: {radius: 7}, id: "Vascular"}
  // {color: "red", marker: {radius: 10}, id: "DR00001"}
  const tissueoptions = tissuelist.map((item: string) => (
    <Select.Option key={item} value={item} type={item}>
      {item}
    </Select.Option>
  ));
  const celltypeoptions = celltypelist.map((item: string) => (
    <Select.Option key={item} value={item} type={item}>
      {item}
    </Select.Option>
  ));
  const onSubmit = async () => {
    if (userinputtissue && userinputcelltype && userinputgene != '') {
      message.success('Submit success!');
      getRemoteCoexpression({
        pageSize: 10000,
        pageIndex: pageindex,
        tissue: userinputtissue,
        celltype: userinputcelltype,
        gene: userinputgene,
        sort_field: undefined,
        sort_direction: undefined,
      }).then((res) => {
        // setLoading(false);
        // setCoexpression(res.data);
        // setTotal(res.meta.total);
        console.log(res.data);
      });
  };
  }
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
      <Title level={2}>
        Co-expression Network Analysis
      </Title>
      <Divider/>
      <Row>
        <Col md={3}>
          <Title level={3}>
            1.Tissue
          </Title>
            <Select
              style={{ width: '80%' }}
              showSearch={true}
              placeholder="tissue"
              allowClear={true}
              bordered={true}
              onFocus={async () => {
                const res = await getRemoteCoexpression({ pageSize: pagesize,
                  pageIndex: pageindex,
                  tissue: undefined,
                  celltype: undefined,
                  gene: undefined,
                  sort_field: undefined,
                  sort_direction: undefined});
                if (res.message == 'success') {
                  const list = res.data.map(function (item) {
                    return item.tissue;
                  });
                  setTissuelist(list);
                }
              }}
              onSearch={async (value: string) => {
                const res = await getRemoteCoexpression({ pageSize: pagesize,
                  pageIndex: pageindex,
                  tissue: undefined,
                  celltype: undefined,
                  gene: undefined,
                  sort_field: undefined,
                  sort_direction: undefined});
                if (res.message == 'success') {
                  const list = res.data.map(function (item) {
                    return item.tissue;
                  });
                  setTissuelist(list);
                } else {
                  setTissuelist([]);
                }
              }}
              onChange={(value: string) => {
                setUserinputtissue(value);
              }}
              onSelect={(value: string) => {
                setUserinputtissue(value);
              }}
              onClear={() => {
                setUserinputtissue(undefined);
              }}
              value={userinputtissue}
            >
              {tissueoptions}
            </Select>
            <br />
            <a
              style={{ color: '#4D96FF' }}
              onClick={() => {
                setUserinputtissue('Cerebral_Cortex');
              }}
            >
              e.g. Cerebral_Cortex
            </a>
        </Col>
        <Col md={3}>
          <Title level={3}>
            2.Cell Type
          </Title>
          <Select
            style={{ width: '80%' }}
            showSearch={true}
            placeholder="cell type"
            allowClear={true}
            bordered={true}
            onFocus={async () => {
              const res = await getRemoteCoexpression({ pageSize: pagesize,
                pageIndex: pageindex,
                tissue: undefined,
                celltype: undefined,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined});
              if (res.message == 'success') {
                const list = res.data.map(function (item) {
                  return item.celltype;
                });
                setCelltypelist(list);
              }
            }}
            onSearch={async (value: string) => {
              const res = await getRemoteCoexpression({ pageSize: pagesize,
                pageIndex: pageindex,
                tissue: undefined,
                celltype: undefined,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined});
              if (res.message == 'success') {
                const list = res.data.map(function (item) {
                  return item.celltype;
                });
                setCelltypelist(list);
              } else {
                setCelltypelist([]);
              }
            }}
            onChange={(value: string) => {
              setUserinputcelltype(value);
            }}
            onSelect={(value: string) => {
              setUserinputcelltype(value);
            }}
            onClear={() => {
              setUserinputcelltype(undefined);
            }}
            value={userinputcelltype}
          >
            {celltypeoptions}
          </Select>
          <br />
          <a
            style={{ color: '#4D96FF' }}
            onClick={() => {
              setUserinputcelltype('Excitatory_Neuron');
            }}
          >
            e.g. Cerebral_Cortex
          </a>
        </Col>
        <Col md={6}>
          <Title level={3}>
            3.Gene Set
          </Title>
          <TextArea
            placeholder="input a collection of gene symbols separated by commas"
            allowClear={true}
            value={userinputgene}
            maxLength={100}
            showCount={true}
            autoSize={{minRows:2,maxRows: 6 }}
            onChange={(e) => {
              if (e.target.value) {
                setUserinputgene(e.target.value.toString());
                // console.log(e.target.value.toString().toUpperCase())
              } else {
                setUserinputgene('');
              }
            }}
          />
          <p
            style={{ color: '#4D96FF' }}
            onClick={() => {
              setUserinputgene('CUL3,RERE,SOX2-OT,MLKL,ALMS1,FLOT1,NIPSNAP1,PPP1R13B,CLCN3,QPCT,ELAC2,MLXIP,DLG4,DGKZ,PCCB,KLC1,CACNA1C,SDCCAG8,TSNARE1');
            }}
          >
            e.g. CUL3,RERE,SOX2-OT,MLKL,ALMS1,FLOT1,NIPSNAP1,PPP1R13B,CLCN3,QPCT,ELAC2,MLXIP,DLG4,DGKZ,PCCB,KLC1,CACNA1C,SDCCAG8,TSNARE1
          </p>
        </Col>
        <Col md={4}>
          <Title level={3}>
            4.
            <Button type="primary" onClick={onSubmit}>
              Submit Job
            </Button>
          </Title>
        </Col>
        <Col md={8}>
          <Title level={3}>
            5. Results:
          </Title>
          <Network network={network} />
        </Col>
      </Row>
      <Row>

      </Row>
    </div>
  );
}
