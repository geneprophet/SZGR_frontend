import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteGenedeg, getRemoteGenedegLike, getRemoteGenedmg } from "@/pages/GeneDeg/service";
import { Breadcrumb, Col, Divider, Row, Select, Space, Table,Typography,Tabs } from "antd";
const {Title} = Typography;
import {
  AnalysisIcon,DetailIcon
} from "../../components/Icons/index";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  const [genedeg, setGenedeg] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [genedmg, setGenedmg] = useState(undefined);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [total2, setTotal2] = useState(0);
  const [pagesize2, setPagesize2] = useState(10);
  const [pageindex2, setPageindex2] = useState(1);

  interface SearchKeywords {
    gene: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});

  const [evidence, setEvidence] = useState('DEG');
  useEffect(()=>{
    if(name){
      if (name == "all"){
        setName(undefined);
        getRemoteGenedeg({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: undefined,
          evidence: evidence,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setGenedeg(res.data);
          setTotal(res.meta.total);
        });
      }else {
        getRemoteGenedeg({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: name,
          evidence: evidence,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setGenedeg(res.data);
          setTotal(res.meta.total);
        });
      }
    }
  },[name]);

  const [genelist, setGenelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);

  const columns =[
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Evidence</strong>,
      key: 'evidence',
      dataIndex: 'evidence',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter:true,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'cmapnameSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGenedeg({
                pageSize: 100,
                pageIndex: 1,
                gene: undefined,
                evidence: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.gene);
                  }
                });
                setGenelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGenedegLike({
                pageSize: 100,
                pageIndex: 1,
                gene:value,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.gene);
                  }
                });
                setGenelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, gene: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      render: (text: string, record: any) => {
          return (
            <span>
          <a href={"https://www.ncbi.nlm.nih.gov/gene/?term=" + record.gene} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.gene}
            </Space>
          </a>
          </span>
          )
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Log2FC</strong>,
      key: 'log2fc',
      dataIndex: 'log2fc',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>FDR</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter:true,
      width: 200,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Ancestry</strong>,
      key: 'pop',
      dataIndex: 'pop',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'n_case',
      dataIndex: 'n_case',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'n_control',
      dataIndex: 'n_control',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter:true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>
              {record.pmid}
            </Space>
          </a>
        </span>
      ),
    },
  ];
  const columns2 =[
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Evidence</strong>,
      key: 'evidence',
      dataIndex: 'evidence',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Probe</strong>,
      key: 'probe',
      dataIndex: 'probe',
      ellipsis: true,
      width: 150,
      search: true,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chip</strong>,
      key: 'chip',
      dataIndex: 'chip',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>LogFC</strong>,
      key: 'logfc',
      dataIndex: 'logfc',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>adjust-p</strong>,
      key: 'adjp',
      dataIndex: 'adjp',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter:true,
      width: 200,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Ancestry</strong>,
      key: 'pop',
      dataIndex: 'pop',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'n_case',
      dataIndex: 'n_case',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'n_control',
      dataIndex: 'n_control',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter:true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>
              {record.pmid}
            </Space>
          </a>
        </span>
      ),
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
    setEvidence(key);
    if(key=="DMG"){
      getRemoteGenedmg({
        pageSize: pagesize2,
        pageIndex: pageindex2,
        gene: name,
        evidence: key,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setLoading2(false);
        setGenedmg(res.data);
        setTotal2(res.meta.total);
      });
    }else {
      getRemoteGenedeg({
        pageSize: pagesize,
        pageIndex: pageindex,
        gene: name,
        evidence: key,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setLoading(false);
        setGenedeg(res.data);
        setTotal(res.meta.total);
      });
    }

  };

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
                <strong style={{ fontFamily: 'sans-serif' }}>
                  Differential Analysis
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: <Title level={3}>DEG</Title>,
            key: 'DEG',
            children:  <Row justify={'center'}>
              <Col md={24}>
                <ProTable
                  columns={columns}
                  bordered={true}
                  options={false}
                  dataSource={genedeg}
                  loading={loading}
                  scroll={{ x: 1200 }}
                  rowKey={(record: any) => {
                    return record.id.toString() + 'table';
                  }}
                  search={{
                    defaultCollapsed: false,
                    labelWidth: 130,
                    searchText: 'Search',
                    resetText: 'Reset',
                    collapseRender: false,
                    collapsed: false,
                  }}
                  pagination={{
                    pageSize: pagesize,
                    total: total,
                    pageSizeOptions: [10, 20, 50, 100],
                    showQuickJumper: true,
                    showSizeChanger: true,
                  }}
                  onSubmit={() => {
                    setLoading(true);
                    getRemoteGenedeg({
                      pageSize: pagesize,
                      pageIndex: 1,
                      gene: keywords.gene,
                      evidence: evidence,
                      sort_field: undefined,
                      sort_direction: undefined,
                    }).then((res) => {
                      setGenedeg(res.data);
                      setLoading(false);
                      setTotal(res.meta.total);
                    });
                  }}
                  onReset={()=>{
                    setLoading(true);
                    getRemoteGenedeg({
                      pageSize: 10,
                      pageIndex: 1,
                      gene:undefined,
                      evidence: evidence,
                      sort_field: undefined,
                      sort_direction: undefined,
                    }).then((res) => {
                      setGenedeg(res.data);
                      setLoading(false);
                      setTotal(res.meta.total);
                      setKeywords({});
                    });
                  }}
                  onChange={(pagination, filters, sorter, extra) => {
                    // console.log(pagination);
                    // console.log(sorter);
                    setPageindex(pagination.current);
                    setPagesize(pagination.pageSize);
                    setKeywords({ ...keywords, sort_field: sorter.field });
                    setKeywords({ ...keywords, sort_direction: sorter.order });
                    setLoading(true);
                    getRemoteGenedeg({
                      pageSize: pagination.pageSize,
                      pageIndex: pagination.current,
                      gene:  keywords.gene,
                      evidence: evidence,
                      sort_field: sorter.field,
                      sort_direction: sorter.order,
                    }).then((res) => {
                      setGenedeg(res.data);
                      setLoading(false);
                      setTotal(res.meta.total);
                    });

                  }}
                  rowSelection={{
                    fixed: true,
                    onSelect: (record, selected, selectedRows, nativeEvent) => {
                      if (selected) {
                        let a = Array.from(new Set(selectitems.concat(selectedRows)));
                        let b = a.filter((res) => res != undefined);
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      } else {
                        let b = selectitems.filter((x) => x.id != record.id);
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      }
                    },
                    onSelectAll: (selected, selectedRows, changeRows) => {
                      if (selected) {
                        let a = uniqueArray(selectitems.concat(changeRows), 'id');
                        let b = a.filter((res) => res != undefined);
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      } else {
                        let a = new Set();
                        changeRows.forEach((value) => {
                          a.add(value.id);
                        });
                        let b = selectitems.filter((x) => !a.has(x.id));
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      }
                    },
                    selectedRowKeys: selectitemsrowkey,
                  }}
                  tableAlertRender={({
                                       selectedRowKeys,
                                       selectedRows,
                                       onCleanSelected,
                                     }) => {
                    const onCancelselected = () => {
                      setSelectitems([]);
                      setSelectitemsrowkey([]);
                    };
                    return (
                      <Space size={24}>
                  <span>
                    {selectitems.length} items selected
                    <span onClick={onCancelselected}>
                      <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                        Clear selected
                      </a>
                    </span>
                  </span>
                      </Space>
                    );
                  }}
                  tableAlertOptionRender={({
                                             selectedRowKeys,
                                             selectedRows,
                                             onCleanSelected,
                                           }) => {
                    return (
                      <Space size={20}>
                        <a
                          onClick={() => {
                            let element = document.createElement('a');
                            const fields = [
                              'gene',
                              'evidence',
                              'log2fc',
                              'p',
                              'fdr',
                              'celltype',
                              'trait',
                              'pop',
                              'n_case',
                              'n_control',
                              'pmid',
                              'year',
                            ];
                            const json2csvParser = new Parser({ fields });
                            const csv = json2csvParser.parse(selectitems);
                            element.setAttribute(
                              'href',
                              'data:text/csv;charset=utf-8,' +
                              encodeURIComponent(csv),
                            );
                            element.setAttribute(
                              'download',
                              'Gene_DEG.csv',
                            );
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                            onCleanSelected;
                          }}
                        >
                          Download
                        </a>
                      </Space>
                    );
                  }}
                />
              </Col>
            </Row>,
          },
          {
            label:  <Title level={3}>DMG</Title>,
            key: 'DMG',
            children: <Row justify={'center'}>
              <Col md={24}>
                <ProTable
                  columns={columns2}
                  bordered={true}
                  options={false}
                  dataSource={genedmg}
                  loading={loading2}
                  scroll={{ x: 1200 }}
                  rowKey={(record: any) => {
                    return record.id.toString() + 'table2';
                  }}
                  search={{
                    defaultCollapsed: false,
                    labelWidth: 130,
                    searchText: 'Search',
                    resetText: 'Reset',
                    collapseRender: false,
                    collapsed: false,
                  }}
                  pagination={{
                    pageSize: pagesize,
                    total: total,
                    pageSizeOptions: [10, 20, 50, 100],
                    showQuickJumper: true,
                    showSizeChanger: true,
                  }}
                  onSubmit={() => {
                    setLoading(true);
                    getRemoteGenedmg({
                      pageSize: pagesize2,
                      pageIndex: 1,
                      gene: keywords.gene,
                      evidence: evidence,
                      sort_field: undefined,
                      sort_direction: undefined,
                    }).then((res) => {
                      setGenedmg(res.data);
                      setLoading2(false);
                      setTotal2(res.meta.total);
                    });
                  }}
                  onReset={()=>{
                    setLoading2(true);
                    getRemoteGenedmg({
                      pageSize: 10,
                      pageIndex: 1,
                      gene:undefined,
                      evidence: evidence,
                      sort_field: undefined,
                      sort_direction: undefined,
                    }).then((res) => {
                      setGenedmg(res.data);
                      setLoading2(false);
                      setTotal2(res.meta.total);
                      setKeywords({});
                    });
                  }}
                  onChange={(pagination, filters, sorter, extra) => {
                    // console.log(pagination);
                    // console.log(sorter);
                    setPageindex2(pagination.current);
                    setPagesize2(pagination.pageSize);
                    setKeywords({ ...keywords, sort_field: sorter.field });
                    setKeywords({ ...keywords, sort_direction: sorter.order });
                    setLoading2(true);
                    getRemoteGenedmg({
                      pageSize: pagination.pageSize,
                      pageIndex: pagination.current,
                      gene:  keywords.gene,
                      evidence: evidence,
                      sort_field: sorter.field,
                      sort_direction: sorter.order,
                    }).then((res) => {
                      setGenedmg(res.data);
                      setLoading2(false);
                      setTotal2(res.meta.total);
                    });
                  }}
                />
              </Col>
            </Row>,
          },
          {
            label: <Title level={3}>DEP</Title>,
            key: 'DEP',
            children: <Row justify={'center'}>
              <Col md={24}>
                <ProTable
                  columns={columns}
                  bordered={true}
                  options={false}
                  dataSource={genedeg}
                  loading={loading}
                  scroll={{ x: 1200 }}
                  rowKey={(record: any) => {
                    return record.id.toString() + 'table';
                  }}
                  search={{
                    defaultCollapsed: false,
                    labelWidth: 130,
                    searchText: 'Search',
                    resetText: 'Reset',
                    collapseRender: false,
                    collapsed: false,
                  }}
                  pagination={{
                    pageSize: pagesize,
                    total: total,
                    pageSizeOptions: [10, 20, 50, 100],
                    showQuickJumper: true,
                    showSizeChanger: true,
                  }}
                  onSubmit={() => {
                    setLoading(true);
                    getRemoteGenedeg({
                      pageSize: pagesize,
                      pageIndex: 1,
                      gene: keywords.gene,
                      evidence: evidence,
                      sort_field: undefined,
                      sort_direction: undefined,
                    }).then((res) => {
                      setGenedeg(res.data);
                      setLoading(false);
                      setTotal(res.meta.total);
                    });
                  }}
                  onReset={()=>{
                    setLoading(true);
                    getRemoteGenedeg({
                      pageSize: 10,
                      pageIndex: 1,
                      gene:undefined,
                      evidence: evidence,
                      sort_field: undefined,
                      sort_direction: undefined,
                    }).then((res) => {
                      setGenedeg(res.data);
                      setLoading(false);
                      setTotal(res.meta.total);
                      setKeywords({});
                    });
                  }}
                  onChange={(pagination, filters, sorter, extra) => {
                    // console.log(pagination);
                    // console.log(sorter);
                    setPageindex(pagination.current);
                    setPagesize(pagination.pageSize);
                    setKeywords({ ...keywords, sort_field: sorter.field });
                    setKeywords({ ...keywords, sort_direction: sorter.order });
                    setLoading(true);
                    getRemoteGenedeg({
                      pageSize: pagination.pageSize,
                      pageIndex: pagination.current,
                      gene:  keywords.gene,
                      evidence: evidence,
                      sort_field: sorter.field,
                      sort_direction: sorter.order,
                    }).then((res) => {
                      setGenedeg(res.data);
                      setLoading(false);
                      setTotal(res.meta.total);
                    });

                  }}
                  rowSelection={{
                    fixed: true,
                    onSelect: (record, selected, selectedRows, nativeEvent) => {
                      if (selected) {
                        let a = Array.from(new Set(selectitems.concat(selectedRows)));
                        let b = a.filter((res) => res != undefined);
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      } else {
                        let b = selectitems.filter((x) => x.id != record.id);
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      }
                    },
                    onSelectAll: (selected, selectedRows, changeRows) => {
                      if (selected) {
                        let a = uniqueArray(selectitems.concat(changeRows), 'id');
                        let b = a.filter((res) => res != undefined);
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      } else {
                        let a = new Set();
                        changeRows.forEach((value) => {
                          a.add(value.id);
                        });
                        let b = selectitems.filter((x) => !a.has(x.id));
                        setSelectitems(b);
                        let c = b.map((value) => value.id + 'table');
                        setSelectitemsrowkey(c);
                      }
                    },
                    selectedRowKeys: selectitemsrowkey,
                  }}
                  tableAlertRender={({
                                       selectedRowKeys,
                                       selectedRows,
                                       onCleanSelected,
                                     }) => {
                    const onCancelselected = () => {
                      setSelectitems([]);
                      setSelectitemsrowkey([]);
                    };
                    return (
                      <Space size={24}>
                  <span>
                    {selectitems.length} items selected
                    <span onClick={onCancelselected}>
                      <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                        Clear selected
                      </a>
                    </span>
                  </span>
                      </Space>
                    );
                  }}
                  tableAlertOptionRender={({
                                             selectedRowKeys,
                                             selectedRows,
                                             onCleanSelected,
                                           }) => {
                    return (
                      <Space size={20}>
                        <a
                          onClick={() => {
                            let element = document.createElement('a');
                            const fields = [
                              'gene',
                              'evidence',
                              'log2fc',
                              'p',
                              'fdr',
                              'celltype',
                              'trait',
                              'pop',
                              'n_case',
                              'n_control',
                              'pmid',
                              'year',
                            ];
                            const json2csvParser = new Parser({ fields });
                            const csv = json2csvParser.parse(selectitems);
                            element.setAttribute(
                              'href',
                              'data:text/csv;charset=utf-8,' +
                              encodeURIComponent(csv),
                            );
                            element.setAttribute(
                              'download',
                              'Gene_DEG.csv',
                            );
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                            onCleanSelected;
                          }}
                        >
                          Download
                        </a>
                      </Space>
                    );
                  }}
                />
              </Col>
            </Row>,
          },
        ]}
        onChange={onChange}
      />
      <Divider/>

    </div>
  );
}
