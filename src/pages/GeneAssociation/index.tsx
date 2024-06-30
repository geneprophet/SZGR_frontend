import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getRemoteGeneewas,
  getRemoteGenepwas,
  getRemoteGenetwas,
  getRemoteGenetwasLike,
} from '@/pages/GeneAssociation/service';
import {
  Breadcrumb,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Typography,
} from 'antd';
import { AnalysisIcon, DetailIcon } from '../../components/Icons/index';
import { URL_PREFIX, uniqueArray } from '@/common/constants';
import { ProTable } from '@ant-design/pro-table';
import { Parser } from 'json2csv';
const { Title } = Typography;
import { getRemoteGenedeg } from '@/pages/GeneDeg/service';
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  const [genetwas, setGenetwas] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [geneewas, setGeneewas] = useState(undefined);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [total2, setTotal2] = useState(0);
  const [pagesize2, setPagesize2] = useState(10);
  const [pageindex2, setPageindex2] = useState(1);

  const [genepwas, setGenepwas] = useState(undefined);
  const [loading3, setLoading3] = useState<boolean>(true);
  const [total3, setTotal3] = useState(0);
  const [pagesize3, setPagesize3] = useState(10);
  const [pageindex3, setPageindex3] = useState(1);

  interface SearchKeywords {
    gene: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  }
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteGenetwas({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading(false);
          setGenetwas(res.data);
          setTotal(res.meta.total);
        });
      } else {
        getRemoteGenetwasLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading(false);
          setGenetwas(res.data);
          setTotal(res.meta.total);
        });
      }
    }
  }, [name]);

  const [genelist, setGenelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const [selectitems2, setSelectitems2] = useState([]);
  const [selectitemsrowkey2, setSelectitemsrowkey2] = useState([]);
  const [selectitems3, setSelectitems3] = useState([]);
  const [selectitemsrowkey3, setSelectitemsrowkey3] = useState([]);

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Evidence</strong>,
      key: 'evidence',
      dataIndex: 'evidence',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'geneSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGenetwas({
                pageSize: 100,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
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
              const remoteKeywords = await getRemoteGenetwasLike({
                pageSize: 100,
                pageIndex: 1,
                gene: value,
                sort_field: undefined,
                sort_direction: undefined,
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
            <a
              href={'https://www.ncbi.nlm.nih.gov/gene/?term=' + record.gene}
              target={'_blank'}
            >
              <Space style={{ fontWeight: 'bold' }}>{record.gene}</Space>
            </a>
          </span>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Beta</strong>,
      key: 'beta',
      dataIndex: 'beta',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>OR</strong>,
      key: 't_or',
      dataIndex: 't_or',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Z score</strong>,
      key: 't_z',
      dataIndex: 't_z',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>FDR</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 200,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'n_case',
      dataIndex: 'n_case',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'n_control',
      dataIndex: 'n_control',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>{record.pmid}</Space>
          </a>
        </span>
      ),
    },
  ];
  const columns2 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Evidence</strong>,
      key: 'evidence',
      dataIndex: 'evidence',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'geneSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGenetwas({
                pageSize: 100,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
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
              const remoteKeywords = await getRemoteGenetwasLike({
                pageSize: 100,
                pageIndex: 1,
                gene: value,
                sort_field: undefined,
                sort_direction: undefined,
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
            <a
              href={'https://www.ncbi.nlm.nih.gov/gene/?term=' + record.gene}
              target={'_blank'}
            >
              <Space style={{ fontWeight: 'bold' }}>{record.gene}</Space>
            </a>
          </span>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Beta</strong>,
      key: 'beta',
      dataIndex: 'beta',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>OR</strong>,
      key: 't_or',
      dataIndex: 't_or',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Z score</strong>,
      key: 't_z',
      dataIndex: 't_z',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>FDR</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 200,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'n_case',
      dataIndex: 'n_case',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'n_control',
      dataIndex: 'n_control',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>{record.pmid}</Space>
          </a>
        </span>
      ),
    },
  ];
  const columns3 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Evidence</strong>,
      key: 'evidence',
      dataIndex: 'evidence',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'geneSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGenetwas({
                pageSize: 100,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
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
              const remoteKeywords = await getRemoteGenetwasLike({
                pageSize: 100,
                pageIndex: 1,
                gene: value,
                sort_field: undefined,
                sort_direction: undefined,
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
            <a
              href={'https://www.ncbi.nlm.nih.gov/gene/?term=' + record.gene}
              target={'_blank'}
            >
              <Space style={{ fontWeight: 'bold' }}>{record.gene}</Space>
            </a>
          </span>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Beta</strong>,
      key: 'beta',
      dataIndex: 'beta',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>OR</strong>,
      key: 't_or',
      dataIndex: 't_or',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Z score</strong>,
      key: 't_z',
      dataIndex: 't_z',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>FDR</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 200,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'n_case',
      dataIndex: 'n_case',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'n_control',
      dataIndex: 'n_control',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>{record.pmid}</Space>
          </a>
        </span>
      ),
    },
  ];
  const [evidence, setEvidence] = useState('TWAS');
  const onChange = (key: string) => {
    console.log(key);
    setEvidence(key);
    if (key == 'TWAS') {
      getRemoteGenetwas({
        pageSize: pagesize,
        pageIndex: pageindex,
        gene: name,
        sort_field: undefined,
        sort_direction: undefined,
      }).then((res) => {
        setLoading(false);
        setGenetwas(res.data);
        setTotal(res.meta.total);
      });
    } else if (key == 'EWAS') {
      getRemoteGeneewas({
        pageSize: pagesize,
        pageIndex: pageindex,
        gene: name,
        sort_field: undefined,
        sort_direction: undefined,
      }).then((res) => {
        setLoading2(false);
        setGeneewas(res.data);
        setTotal2(res.meta.total);
      });
    } else if (key == 'PWAS') {
      getRemoteGenepwas({
        pageSize: pagesize,
        pageIndex: pageindex,
        gene: name,
        sort_field: undefined,
        sort_direction: undefined,
      }).then((res) => {
        setLoading3(false);
        setGenepwas(res.data);
        setTotal3(res.meta.total);
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
                  Association Analysis
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
            label: <Title level={3}>TWAS</Title>,
            key: 'TWAS',
            children: (
              <Row justify={'center'}>
                <Col md={24}>
                  <ProTable
                    columns={columns}
                    bordered={true}
                    options={false}
                    dataSource={genetwas}
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
                      getRemoteGenetwas({
                        pageSize: pagesize,
                        pageIndex: 1,
                        gene: keywords.gene,
                        sort_field: undefined,
                        sort_direction: undefined,
                      }).then((res) => {
                        setGenetwas(res.data);
                        setLoading(false);
                        setTotal(res.meta.total);
                      });
                    }}
                    onReset={() => {
                      setLoading(true);
                      getRemoteGenetwas({
                        pageSize: 10,
                        pageIndex: 1,
                        gene: undefined,
                        sort_field: undefined,
                        sort_direction: undefined,
                      }).then((res) => {
                        setGenetwas(res.data);
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
                      setKeywords({
                        ...keywords,
                        sort_direction: sorter.order,
                      });
                      setLoading(true);
                      getRemoteGenetwas({
                        pageSize: pagination.pageSize,
                        pageIndex: pagination.current,
                        gene: keywords.gene,
                        sort_field: sorter.field,
                        sort_direction: sorter.order,
                      }).then((res) => {
                        setGenetwas(res.data);
                        setLoading(false);
                        setTotal(res.meta.total);
                      });
                    }}
                    rowSelection={{
                      fixed: true,
                      onSelect: (
                        record,
                        selected,
                        selectedRows,
                        nativeEvent,
                      ) => {
                        if (selected) {
                          let a = Array.from(
                            new Set(selectitems.concat(selectedRows)),
                          );
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
                          let a = uniqueArray(
                            selectitems.concat(changeRows),
                            'id',
                          );
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
                              <a
                                style={{ marginLeft: 8 }}
                                onClick={onCleanSelected}
                              >
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
                                'celltype',
                                'species',
                                'trait',
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
                                'Gene_curation.csv',
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
              </Row>
            ),
          },
          {
            label: <Title level={3}>EWAS</Title>,
            key: 'EWAS',
            children: (
              <Row justify={'center'}>
                <Col md={24}>
                  <ProTable
                    columns={columns2}
                    bordered={true}
                    options={false}
                    dataSource={geneewas}
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
                      pageSize: pagesize2,
                      total: total2,
                      pageSizeOptions: [10, 20, 50, 100],
                      showQuickJumper: true,
                      showSizeChanger: true,
                    }}
                    onSubmit={() => {
                      setLoading2(true);
                      getRemoteGeneewas({
                        pageSize: pagesize2,
                        pageIndex: 1,
                        gene: keywords.gene,
                        sort_field: undefined,
                        sort_direction: undefined,
                      }).then((res) => {
                        setGeneewas(res.data);
                        setLoading2(false);
                        setTotal2(res.meta.total);
                      });
                    }}
                    onReset={() => {
                      setLoading2(true);
                      getRemoteGeneewas({
                        pageSize: 10,
                        pageIndex: 1,
                        gene: undefined,
                        sort_field: undefined,
                        sort_direction: undefined,
                      }).then((res) => {
                        setGeneewas(res.data);
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
                      setKeywords({
                        ...keywords,
                        sort_direction: sorter.order,
                      });
                      setLoading2(true);
                      getRemoteGeneewas({
                        pageSize: pagination.pageSize,
                        pageIndex: pagination.current,
                        gene: keywords.gene,
                        sort_field: sorter.field,
                        sort_direction: sorter.order,
                      }).then((res) => {
                        setGeneewas(res.data);
                        setLoading2(false);
                        setTotal2(res.meta.total);
                      });
                    }}
                    rowSelection={{
                      fixed: true,
                      onSelect: (
                        record,
                        selected,
                        selectedRows,
                        nativeEvent,
                      ) => {
                        if (selected) {
                          let a = Array.from(
                            new Set(selectitems2.concat(selectedRows)),
                          );
                          let b = a.filter((res) => res != undefined);
                          setSelectitems2(b);
                          let c = b.map((value) => value.id + 'table2');
                          setSelectitemsrowkey2(c);
                        } else {
                          let b = selectitems2.filter((x) => x.id != record.id);
                          setSelectitems2(b);
                          let c = b.map((value) => value.id + 'table2');
                          setSelectitemsrowkey2(c);
                        }
                      },
                      onSelectAll: (selected, selectedRows, changeRows) => {
                        if (selected) {
                          let a = uniqueArray(
                            selectitems2.concat(changeRows),
                            'id',
                          );
                          let b = a.filter((res) => res != undefined);
                          setSelectitems2(b);
                          let c = b.map((value) => value.id + 'table2');
                          setSelectitemsrowkey2(c);
                        } else {
                          let a = new Set();
                          changeRows.forEach((value) => {
                            a.add(value.id);
                          });
                          let b = selectitems2.filter((x) => !a.has(x.id));
                          setSelectitems2(b);
                          let c = b.map((value) => value.id + 'table2');
                          setSelectitemsrowkey2(c);
                        }
                      },
                      selectedRowKeys: selectitemsrowkey2,
                    }}
                    tableAlertRender={({
                      selectedRowKeys,
                      selectedRows,
                      onCleanSelected,
                    }) => {
                      const onCancelselected = () => {
                        setSelectitems2([]);
                        setSelectitemsrowkey2([]);
                      };
                      return (
                        <Space size={24}>
                          <span>
                            {selectitems2.length} items selected
                            <span onClick={onCancelselected}>
                              <a
                                style={{ marginLeft: 8 }}
                                onClick={onCleanSelected}
                              >
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
                                'celltype',
                                'species',
                                'trait',
                                'pmid',
                                'year',
                              ];
                              const json2csvParser = new Parser({ fields });
                              const csv = json2csvParser.parse(selectitems2);
                              element.setAttribute(
                                'href',
                                'data:text/csv;charset=utf-8,' +
                                  encodeURIComponent(csv),
                              );
                              element.setAttribute(
                                'download',
                                'Gene_curation.csv',
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
              </Row>
            ),
          },
          // {
          //   label: <Title level={3}>PWAS</Title>,
          //   key: 'PWAS',
          //   children: <Row justify={'center'}>
          //     <Col md={24}>
          //       <ProTable
          //         columns={columns3}
          //         bordered={true}
          //         options={false}
          //         dataSource={genepwas}
          //         loading={loading3}
          //         scroll={{ x: 1200 }}
          //         rowKey={(record: any) => {
          //           return record.id.toString() + 'table3';
          //         }}
          //         search={{
          //           defaultCollapsed: false,
          //           labelWidth: 130,
          //           searchText: 'Search',
          //           resetText: 'Reset',
          //           collapseRender: false,
          //           collapsed: false,
          //         }}
          //         pagination={{
          //           pageSize: pagesize3,
          //           total: total3,
          //           pageSizeOptions: [10, 20, 50, 100],
          //           showQuickJumper: true,
          //           showSizeChanger: true,
          //         }}
          //         onSubmit={() => {
          //           setLoading3(true);
          //           getRemoteGenepwas({
          //             pageSize: pagesize3,
          //             pageIndex: 1,
          //             gene: keywords.gene,
          //             sort_field: undefined,
          //             sort_direction: undefined,
          //           }).then((res) => {
          //             setGenepwas(res.data);
          //             setLoading3(false);
          //             setTotal3(res.meta.total);
          //           });
          //         }}
          //         onReset={()=>{
          //           setLoading3(true);
          //           getRemoteGenepwas({
          //             pageSize: 10,
          //             pageIndex: 1,
          //             gene:undefined,
          //             sort_field: undefined,
          //             sort_direction: undefined,
          //           }).then((res) => {
          //             setGenepwas(res.data);
          //             setLoading3(false);
          //             setTotal3(res.meta.total);
          //             setKeywords({});
          //           });
          //         }}
          //         onChange={(pagination, filters, sorter, extra) => {
          //           // console.log(pagination);
          //           // console.log(sorter);
          //           setPageindex3(pagination.current);
          //           setPagesize3(pagination.pageSize);
          //           setKeywords({ ...keywords, sort_field: sorter.field });
          //           setKeywords({ ...keywords, sort_direction: sorter.order });
          //           setLoading(true);
          //           getRemoteGenepwas({
          //             pageSize: pagination.pageSize,
          //             pageIndex: pagination.current,
          //             gene:  keywords.gene,
          //             sort_field: sorter.field,
          //             sort_direction: sorter.order,
          //           }).then((res) => {
          //             setGenepwas(res.data);
          //             setLoading3(false);
          //             setTotal3(res.meta.total);
          //           });
          //
          //         }}
          //         rowSelection={{
          //           fixed: true,
          //           onSelect: (record, selected, selectedRows, nativeEvent) => {
          //             if (selected) {
          //               let a = Array.from(new Set(selectitems3.concat(selectedRows)));
          //               let b = a.filter((res) => res != undefined);
          //               setSelectitems3(b);
          //               let c = b.map((value) => value.id + 'table3');
          //               setSelectitemsrowkey3(c);
          //             } else {
          //               let b = selectitems3.filter((x) => x.id != record.id);
          //               setSelectitems3(b);
          //               let c = b.map((value) => value.id + 'table3');
          //               setSelectitemsrowkey3(c);
          //             }
          //           },
          //           onSelectAll: (selected, selectedRows, changeRows) => {
          //             if (selected) {
          //               let a = uniqueArray(selectitems3.concat(changeRows), 'id');
          //               let b = a.filter((res) => res != undefined);
          //               setSelectitems3(b);
          //               let c = b.map((value) => value.id + 'table3');
          //               setSelectitemsrowkey3(c);
          //             } else {
          //               let a = new Set();
          //               changeRows.forEach((value) => {
          //                 a.add(value.id);
          //               });
          //               let b = selectitems3.filter((x) => !a.has(x.id));
          //               setSelectitems3(b);
          //               let c = b.map((value) => value.id + 'table3');
          //               setSelectitemsrowkey3(c);
          //             }
          //           },
          //           selectedRowKeys: selectitemsrowkey3,
          //         }}
          //         tableAlertRender={({
          //                              selectedRowKeys,
          //                              selectedRows,
          //                              onCleanSelected,
          //                            }) => {
          //           const onCancelselected = () => {
          //             setSelectitems3([]);
          //             setSelectitemsrowkey3([]);
          //           };
          //           return (
          //             <Space size={24}>
          //         <span>
          //           {selectitems3.length} items selected
          //           <span onClick={onCancelselected}>
          //             <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
          //               Clear selected
          //             </a>
          //           </span>
          //         </span>
          //             </Space>
          //           );
          //         }}
          //         tableAlertOptionRender={({
          //                                    selectedRowKeys,
          //                                    selectedRows,
          //                                    onCleanSelected,
          //                                  }) => {
          //           return (
          //             <Space size={20}>
          //               <a
          //                 onClick={() => {
          //                   let element = document.createElement('a');
          //                   const fields = [
          //                     'gene',
          //                     'celltype',
          //                     'species',
          //                     'trait',
          //                     'pmid',
          //                     'year',
          //                   ];
          //                   const json2csvParser = new Parser({ fields });
          //                   const csv = json2csvParser.parse(selectitems3);
          //                   element.setAttribute(
          //                     'href',
          //                     'data:text/csv;charset=utf-8,' +
          //                     encodeURIComponent(csv),
          //                   );
          //                   element.setAttribute(
          //                     'download',
          //                     'Gene_curation.csv',
          //                   );
          //                   element.style.display = 'none';
          //                   document.body.appendChild(element);
          //                   element.click();
          //                   document.body.removeChild(element);
          //                   onCleanSelected;
          //                 }}
          //               >
          //                 Download
          //               </a>
          //             </Space>
          //           );
          //         }}
          //       />
          //     </Col>
          //   </Row>,
          // },
        ]}
        onChange={onChange}
      />
      <Divider />
    </div>
  );
}
