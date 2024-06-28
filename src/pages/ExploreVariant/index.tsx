import React, { useEffect, useState } from "react";
import styles from './index.less';
import {
  getRemoteVariantAnno,
  getRemoteVariantAnnoLike,
  getRemoteVariantGeneLike, getRemoteVariantCrispr,
  getRemoteVariantGene, getRemoteVariantMPRA, getRemoteVariantMPRALike, getRemoteVariantValidate
} from "@/pages/ExploreVariant/service";
import { ApartmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Parser } from 'json2csv';
// @ts-ignore
import { URL_PREFIX,uniqueArray } from '@/common/constants';
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
const { Title, Paragraph, Text, Link } = Typography;
import { ProColumns, ProTable } from "@ant-design/pro-table";
import {
  AnalysisIcon
} from "../../components/Icons/index";
import { getRemoteVariant, getRemoteVariantLike } from "@/pages/VariantOverview/service";
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  const [variants, setVariants] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [variants2, setVariants2] = useState(undefined);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [total2, setTotal2] = useState(0);
  const [pagesize2, setPagesize2] = useState(10);
  const [pageindex2, setPageindex2] = useState(1);

  const [variants3, setVariants3] = useState(undefined);
  const [loading3, setLoading3] = useState<boolean>(true);
  const [total3, setTotal3] = useState(0);
  const [pagesize3, setPagesize3] = useState(10);
  const [pageindex3, setPageindex3] = useState(1);

  const [variants4, setVariants4] = useState(undefined);
  const [loading4, setLoading4] = useState<boolean>(true);
  const [total4, setTotal4] = useState(0);
  const [pagesize4, setPagesize4] = useState(10);
  const [pageindex4, setPageindex4] = useState(1);

  const [variants5, setVariants5] = useState(undefined);
  const [loading5, setLoading5] = useState<boolean>(true);
  const [total5, setTotal5] = useState(0);
  const [pagesize5, setPagesize5] = useState(10);
  const [pageindex5, setPageindex5] = useState(1);

  const [variants6, setVariants6] = useState(undefined);
  const [loading6, setLoading6] = useState<boolean>(true);
  const [total6, setTotal6] = useState(0);
  const [pagesize6, setPagesize6] = useState(10);
  const [pageindex6, setPageindex6] = useState(1);
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
    if (name){
      if(name == "all"){
        setName(undefined);
        getRemoteVariantAnno({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      }else if(name.startsWith("rs")){
        setKeywords({ ...keywords, vid: name });
        getRemoteVariantAnno({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid:name,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      }
    }
  }, [name]);
  useEffect(() => {
    if (name){
      if(name == "all"){
        setName(undefined);
        getRemoteVariant({
          pageSize: pagesize2,
          pageIndex: pageindex2,
          vid: undefined,
          vtype:undefined,
          pop:undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading2(false);
          setVariants2(res.data);
          setTotal2(res.meta.total);
        });
      }else if(name.startsWith("rs")){
        setKeywords({ ...keywords, vid: name });
        getRemoteVariantLike({
          pageSize: pagesize2,
          pageIndex: pageindex2,
          vid:name,
          vtype:undefined,
          pop:undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading2(false);
          setVariants2(res.data);
          setTotal2(res.meta.total);
        });
      } else{
        getRemoteVariantLike({
          pageSize: pagesize2,
          pageIndex: pageindex2,
          vid:undefined,
          vtype:name,
          pop:undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading2(false);
          setVariants2(res.data);
          setTotal2(res.meta.total);
        });
      }
    }

  }, [name]);
  useEffect(() => {
    if (name){
      if(name == "all"){
        setName(undefined);
        getRemoteVariantGene({
          pageSize: pagesize3,
          pageIndex: pageindex3,
          vid: undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading3(false);
          setVariants3(res.data);
          setTotal3(res.meta.total);
        });
      }else if(name.startsWith("rs")){
        setKeywords({ ...keywords, vid: name });
        getRemoteVariantGeneLike({
          pageSize: pagesize3,
          pageIndex: pageindex3,
          vid:name,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading3(false);
          setVariants3(res.data);
          setTotal3(res.meta.total);
        });
      }
    }

  }, [name]);
  useEffect(() => {
    if (name){
      if(name == "all"){
        setName(undefined);
        getRemoteVariantMPRA({
          pageSize: pagesize4,
          pageIndex: pageindex4,
          vid: undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading4(false);
          setVariants4(res.data);
          setTotal4(res.meta.total);
        });
      }else if(name.startsWith("rs")){
        setKeywords({ ...keywords, vid: name });
        getRemoteVariantMPRALike({
          pageSize: pagesize4,
          pageIndex: pageindex4,
          vid:name,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading4(false);
          setVariants4(res.data);
          setTotal4(res.meta.total);
        });
      }
    }

  }, [name]);
  useEffect(() => {
    if (name){
      if(name == "all"){
        setName(undefined);
        getRemoteVariantCrispr({
          pageSize: pagesize5,
          pageIndex: pageindex5,
          vid: undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading5(false);
          setVariants5(res.data);
          setTotal5(res.meta.total);
        });
      }else if(name.startsWith("rs")){
        setKeywords({ ...keywords, vid: name });
        getRemoteVariantCrispr({
          pageSize: pagesize5,
          pageIndex: pageindex5,
          vid:name,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading5(false);
          setVariants5(res.data);
          setTotal5(res.meta.total);
        });
      }
    }

  }, [name]);
  useEffect(() => {
    if (name){
      if(name == "all"){
        setName(undefined);
        getRemoteVariantValidate({
          pageSize: pagesize6,
          pageIndex: pageindex6,
          vid: undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading6(false);
          setVariants6(res.data);
          setTotal6(res.meta.total);
        });
      }else if(name.startsWith("rs")){
        setKeywords({ ...keywords, vid: name });
        getRemoteVariantValidate({
          pageSize: pagesize6,
          pageIndex: pageindex6,
          vid:name,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          // console.log(res.data);
          setLoading6(false);
          setVariants6(res.data);
          setTotal6(res.meta.total);
        });
      }
    }

  }, [name]);

  const [vtypelist, setVtypelist] = useState([]);
  const [vidlist, setVidlist] = useState([]);
  const [genelist, setGenelist] = useState([]);
  const [poplist, setPoplist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const [selectitems2, setSelectitems2] = useState([]);
  const [selectitemsrowkey2, setSelectitemsrowkey2] = useState([]);
  const [selectitems3, setSelectitems3] = useState([]);
  const [selectitemsrowkey3, setSelectitemsrowkey3] = useState([]);
  const [selectitems4, setSelectitems4] = useState([]);
  const [selectitemsrowkey4, setSelectitemsrowkey4] = useState([]);
  const [selectitems5, setSelectitems5] = useState([]);
  const [selectitemsrowkey5, setSelectitemsrowkey5] = useState([]);

  const columns = [
    // Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>vid</strong>,
      key: 'vid',
      dataIndex: 'vid',
      ellipsis: true,
      width: 120,
      sorter: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>alle</strong>,
      key: 'alle',
      dataIndex: 'alle',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chr</strong>,
      key: 'vchr',
      dataIndex: 'vchr',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Position</strong>,
      key: 'vpos',
      dataIndex: 'vpos',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>afr</strong>,
      key: 'afr',
      dataIndex: 'afr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>amr</strong>,
      key: 'amr',
      dataIndex: 'amr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>eas</strong>,
      key: 'eas',
      dataIndex: 'eas',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>eur</strong>,
      key: 'eur',
      dataIndex: 'eur',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>sas</strong>,
      key: 'sas',
      dataIndex: 'sas',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cadd</strong>,
      key: 'cadd',
      dataIndex: 'cadd',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>fit</strong>,
      key: 'fit',
      dataIndex: 'fit',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },

    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>eigen</strong>,
      key: 'eigen',
      dataIndex: 'eigen',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pc</strong>,
      key: 'pc',
      dataIndex: 'pc',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>funseq</strong>,
      key: 'funseq',
      dataIndex: 'funseq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    }
  ];
  const columns2 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant Type</strong>,
      key: 'vtype',
      dataIndex: 'vtype',
      ellipsis: true,
      width: 120,
      sorter: true,
      renderFormItem: () => {
        const options = vtypelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'vtypeSelect'}
            showSearch={true}
            placeholder={'input and select a type'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariant({
                pageSize: 1000,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: undefined,
                pop: keywords.pop,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vtype);
                  }
                });
                setVtypelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: value,
                pop: keywords.pop,
                sort_field:undefined,
                sort_direction:undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vtype);
                  }
                });
                setVtypelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, vtype: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant ID</strong>,
      key: 'vid',
      dataIndex: 'vid',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
      renderFormItem: () => {
        const options = vidlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'vidSelect'}
            showSearch={true}
            placeholder={'input and select a rsid'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariant({
                pageSize: 100,
                pageIndex: 1,
                vid: undefined,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vid);
                  }
                });
                setVidlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: value,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field:undefined,
                sort_direction:undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vid);
                  }
                });
                setVidlist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, vid: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Locus</strong>,
      key: 'loc',
      dataIndex: 'loc',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chr</strong>,
      key: 'vchr',
      dataIndex: 'vchr',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Start</strong>,
      key: 'vs',
      dataIndex: 'vs',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>End</strong>,
      key: 've',
      dataIndex: 've',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Effect Allele</strong>,
      key: 'ea',
      dataIndex: 'ea',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Reference Allele</strong>,
      key: 'noa',
      dataIndex: 'noa',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Beta</strong>,
      key: 'beta',
      dataIndex: 'beta',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Ancestry</strong>,
      key: 'pop',
      dataIndex: 'pop',
      ellipsis: true,
      search: true,
      sorter: true,
      width:100,
      renderFormItem: () => {
        const options = poplist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'popSelect'}
            showSearch={true}
            placeholder={'input and select a ancestry'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariant({
                pageSize: 100,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: keywords.vtype,
                pop: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pop);
                  }
                });
                setPoplist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: keywords.vtype,
                pop: value,
                sort_field:undefined,
                sort_direction:undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pop);
                  }
                });
                setPoplist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, pop: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },

    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'ncase',
      dataIndex: 'ncase',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'ncontrol',
      dataIndex: 'ncontrol',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>nor</strong>,
      key: 'nor',
      dataIndex: 'nor',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
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
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'nyear',
      dataIndex: 'nyear',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    }
  ];
  const columns3 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant ID</strong>,
      key: 'vid',
      dataIndex: 'vid',
      ellipsis: true,
      width: 150,
      search: false,
      sorter: true,
      renderFormItem: () => {
        const options = vidlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'vidSelect'}
            showSearch={true}
            placeholder={'input and select a rsid'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariant({
                pageSize: 100,
                pageIndex: 1,
                vid: undefined,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vid);
                  }
                });
                setVidlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: value,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field:undefined,
                sort_direction:undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vid);
                  }
                });
                setVidlist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, vid: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chr</strong>,
      key: 'vchr',
      dataIndex: 'vchr',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Position</strong>,
      key: 'vpos',
      dataIndex: 'vpos',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>abc</strong>,
      key: 'abc',
      dataIndex: 'abc',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cell</strong>,
      key: 'cell',
      dataIndex: 'cell',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gacc</strong>,
      key: 'gacc',
      dataIndex: 'gacc',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cacc</strong>,
      key: 'cacc',
      dataIndex: 'cacc',
      ellipsis: true,
      search: true,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gpchi</strong>,
      key: 'gpchi',
      dataIndex: 'gpchi',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cpchi</strong>,
      key: 'cpchi',
      dataIndex: 'cpchi',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },

    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gca</strong>,
      key: 'gca',
      dataIndex: 'gca',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cca</strong>,
      key: 'cca',
      dataIndex: 'cca',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gha</strong>,
      key: 'gha',
      dataIndex: 'gha',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cha</strong>,
      key: 'cha',
      dataIndex: 'cha',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>geq</strong>,
      key: 'geq',
      dataIndex: 'geq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ceq</strong>,
      key: 'ceq',
      dataIndex: 'ceq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gro</strong>,
      key: 'gro',
      dataIndex: 'gro',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cro</strong>,
      key: 'cro',
      dataIndex: 'cro',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gsq</strong>,
      key: 'gsq',
      dataIndex: 'gsq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>csq</strong>,
      key: 'csq',
      dataIndex: 'csq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gpq</strong>,
      key: 'gpq',
      dataIndex: 'gpq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cpq</strong>,
      key: 'cpq',
      dataIndex: 'cpq',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    }
  ];

  const columns4 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant ID</strong>,
      key: 'vid',
      dataIndex: 'vid',
      ellipsis: true,
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chr</strong>,
      key: 'chr',
      dataIndex: 'chr',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Position</strong>,
      key: 'pos',
      dataIndex: 'pos',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ref</strong>,
      key: 'ref',
      dataIndex: 'ref',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>alt</strong>,
      key: 'alt',
      dataIndex: 'alt',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>strand</strong>,
      key: 'strand',
      dataIndex: 'strand',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>hap</strong>,
      key: 'hap',
      dataIndex: 'hap',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>log2fc_ref</strong>,
      key: 'log2fc_ref',
      dataIndex: 'log2fc_ref',
      ellipsis: true,
      search: true,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p_ref</strong>,
      key: 'p_ref',
      dataIndex: 'p_ref',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>padj_ref</strong>,
      key: 'padj_ref',
      dataIndex: 'padj_ref',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },

    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>log2fc_alt</strong>,
      key: 'log2fc_alt',
      dataIndex: 'log2fc_alt',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p_alt</strong>,
      key: 'p_alt',
      dataIndex: 'p_alt',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>padj_alt</strong>,
      key: 'padj_alt',
      dataIndex: 'padj_alt',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>celltype</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pmid</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
  ];

  const columns5 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>technology</strong>,
      key: 'technology',
      dataIndex: 'technology',
      ellipsis: true,
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>grna</strong>,
      key: 'grna',
      dataIndex: 'grna',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>chr</strong>,
      key: 'chr',
      dataIndex: 'chr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>start</strong>,
      key: 'start',
      dataIndex: 'start',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>end</strong>,
      key: 'end',
      dataIndex: 'end',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>diff</strong>,
      key: 'diff',
      dataIndex: 'diff',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>log2fc</strong>,
      key: 'log2fc',
      dataIndex: 'log2fc',
      ellipsis: true,
      search: true,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>fdr</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },

    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>celltype</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pmid</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
  ];
  const columns6 = [
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant ID</strong>,
      key: 'vid',
      dataIndex: 'vid',
      ellipsis: true,
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>loc</strong>,
      key: 'loc',
      dataIndex: 'loc',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chr</strong>,
      key: 'vchr',
      dataIndex: 'vchr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>start</strong>,
      key: 'vs',
      dataIndex: 'vs',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>end</strong>,
      key: 've',
      dataIndex: 've',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>celltype</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: true,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>species</strong>,
      key: 'species',
      dataIndex: 'species',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>year</strong>,
      key: 'nyear',
      dataIndex: 'nyear',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
  ];

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
                  Variants
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col md={4}>
          <Title level={2}>SNP Annotation</Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns}
            bordered={true}
            options={false}
            dataSource={variants}
            loading={loading}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table';
            }}
            search={false}
            pagination={{
              pageSize: pagesize,
              total: total,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading(true);
              getRemoteVariantAnno({
                pageSize: pagesize,
                pageIndex: 1,
                vid:keywords.vid,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading(true);
              getRemoteVariantAnno({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants(res.data);
                setLoading(false);
                setTotal(res.meta.total);
                setPagesize(res.meta.pageSize);
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
              if (name){
                getRemoteVariantAnnoLike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }else {
                getRemoteVariantAnno({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }
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
                        'vid',
                        'alle',
                        'vchr',
                        'vpos',
                        'afr',
                        'amr',
                        'eas',
                        'eur',
                        'sas',
                        'cadd',
                        'fit',
                        'eigen',
                        'pc',
                        'funseq',
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
                        'SZGR_variant.csv',
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
      <Divider/>
      <Row>
        <Col md={4}>
          <Title level={2}>Curation variant</Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns2}
            bordered={true}
            options={false}
            dataSource={variants2}
            loading={loading2}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table2';
            }}
            search={false}
            pagination={{
              pageSize: pagesize2,
              total: total2,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading2(true);
              getRemoteVariant({
                pageSize: pagesize2,
                pageIndex: 1,
                vid:keywords.vid,
                vtype:keywords.vtype,
                pop:keywords.pop,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants2(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading2(true);
              getRemoteVariant({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                vtype:undefined,
                pop:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants2(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
                setPagesize2(res.meta.pageSize);
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
              if (name){
                getRemoteVariantLike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  vtype:keywords.vtype,
                  pop:keywords.pop,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants2(res.data);
                  setLoading2(false);
                  setTotal2(res.meta.total);
                });
              }else {
                getRemoteVariant({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  vtype:keywords.vtype,
                  pop:keywords.pop,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants2(res.data);
                  setLoading2(false);
                  setTotal2(res.meta.total);
                });
              }
            }}
            rowSelection={{
              fixed: true,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                if (selected) {
                  let a = Array.from(new Set(selectitems2.concat(selectedRows)));
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
                  let a = uniqueArray(selectitems2.concat(changeRows), 'id');
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
                        'vid',
                        'vtype',
                        'loc',
                        'vchr',
                        'vs',
                        've',
                        'ea',
                        'noa',
                        'nor',
                        'beta',
                        'p',
                        'gene',
                        'pop',
                        'trait',
                        'ncase',
                        'ncontrol',
                        'nyear',
                        'pmid',
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
                        'SZGR_variants.csv',
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
      <Divider/>
      <Row>
        <Col md={4}>
          <Title level={2}>Target Gene</Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns3}
            bordered={true}
            options={false}
            dataSource={variants3}
            loading={loading3}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table3';
            }}
            search={false}
            pagination={{
              pageSize: pagesize3,
              total: total3,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading3(true);
              getRemoteVariantGene({
                pageSize: pagesize3,
                pageIndex: 1,
                vid:keywords.vid,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants3(res.data);
                setLoading3(false);
                setTotal3(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading3(true);
              getRemoteVariantGene({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants3(res.data);
                setLoading3(false);
                setTotal3(res.meta.total);
                setPagesize3(res.meta.pageSize);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex3(pagination.current);
              setPagesize3(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading3(true);
              if (name){
                getRemoteVariantGeneLike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants3(res.data);
                  setLoading3(false);
                  setTotal3(res.meta.total);
                });
              }else {
                getRemoteVariantGene({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants3(res.data);
                  setLoading3(false);
                  setTotal3(res.meta.total);
                });
              }
            }}
            rowSelection={{
              fixed: true,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                if (selected) {
                  let a = Array.from(new Set(selectitems3.concat(selectedRows)));
                  let b = a.filter((res) => res != undefined);
                  setSelectitems3(b);
                  let c = b.map((value) => value.id + 'table3');
                  setSelectitemsrowkey3(c);
                } else {
                  let b = selectitems.filter((x) => x.id != record.id);
                  setSelectitems3(b);
                  let c = b.map((value) => value.id + 'table3');
                  setSelectitemsrowkey3(c);
                }
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                if (selected) {
                  let a = uniqueArray(selectitems3.concat(changeRows), 'id');
                  let b = a.filter((res) => res != undefined);
                  setSelectitems3(b);
                  let c = b.map((value) => value.id + 'table3');
                  setSelectitemsrowkey3(c);
                } else {
                  let a = new Set();
                  changeRows.forEach((value) => {
                    a.add(value.id);
                  });
                  let b = selectitems3.filter((x) => !a.has(x.id));
                  setSelectitems3(b);
                  let c = b.map((value) => value.id + 'table3');
                  setSelectitemsrowkey3(c);
                }
              },
              selectedRowKeys: selectitemsrowkey3,
            }}
            tableAlertRender={({
                                 selectedRowKeys,
                                 selectedRows,
                                 onCleanSelected,
                               }) => {
              const onCancelselected = () => {
                setSelectitems3([]);
                setSelectitemsrowkey3([]);
              };
              return (
                <Space size={24}>
                  <span>
                    {selectitems3.length} items selected
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
                        'vid',
                        'vtype',
                        'loc',
                        'vchr',
                        'vs',
                        've',
                        'ea',
                        'noa',
                        'nor',
                        'beta',
                        'p',
                        'gene',
                        'pop',
                        'trait',
                        'ncase',
                        'ncontrol',
                        'nyear',
                        'pmid',
                      ];
                      const json2csvParser = new Parser({ fields });
                      const csv = json2csvParser.parse(selectitems3);
                      element.setAttribute(
                        'href',
                        'data:text/csv;charset=utf-8,' +
                        encodeURIComponent(csv),
                      );
                      element.setAttribute(
                        'download',
                        'SZGR_variants.csv',
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
      <Divider/>
      <Row>
        <Col md={4}>
          <Title level={2}>MPRA</Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns4}
            bordered={true}
            options={false}
            dataSource={variants4}
            loading={loading4}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table4';
            }}
            search={false}
            pagination={{
              pageSize: pagesize4,
              total: total4,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading4(true);
              getRemoteVariantMPRA({
                pageSize: pagesize4,
                pageIndex: 1,
                vid:keywords.vid,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants4(res.data);
                setLoading4(false);
                setTotal4(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading4(true);
              getRemoteVariantMPRA({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants4(res.data);
                setLoading4(false);
                setTotal4(res.meta.total);
                setPagesize4(res.meta.pageSize);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex4(pagination.current);
              setPagesize4(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading4(true);
              if (name){
                getRemoteVariantMPRALike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants4(res.data);
                  setLoading4(false);
                  setTotal4(res.meta.total);
                });
              }else {
                getRemoteVariantMPRA({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants4(res.data);
                  setLoading4(false);
                  setTotal4(res.meta.total);
                });
              }
            }}
            rowSelection={{
              fixed: true,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                if (selected) {
                  let a = Array.from(new Set(selectitems4.concat(selectedRows)));
                  let b = a.filter((res) => res != undefined);
                  setSelectitems4(b);
                  let c = b.map((value) => value.id + 'table4');
                  setSelectitemsrowkey4(c);
                } else {
                  let b = selectitems.filter((x) => x.id != record.id);
                  setSelectitems4(b);
                  let c = b.map((value) => value.id + 'table4');
                  setSelectitemsrowkey4(c);
                }
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                if (selected) {
                  let a = uniqueArray(selectitems4.concat(changeRows), 'id');
                  let b = a.filter((res) => res != undefined);
                  setSelectitems4(b);
                  let c = b.map((value) => value.id + 'table4');
                  setSelectitemsrowkey4(c);
                } else {
                  let a = new Set();
                  changeRows.forEach((value) => {
                    a.add(value.id);
                  });
                  let b = selectitems4.filter((x) => !a.has(x.id));
                  setSelectitems4(b);
                  let c = b.map((value) => value.id + 'table4');
                  setSelectitemsrowkey4(c);
                }
              },
              selectedRowKeys: selectitemsrowkey4,
            }}
            tableAlertRender={({
                                 selectedRowKeys,
                                 selectedRows,
                                 onCleanSelected,
                               }) => {
              const onCancelselected = () => {
                setSelectitems4([]);
                setSelectitemsrowkey4([]);
              };
              return (
                <Space size={24}>
                  <span>
                    {selectitems4.length} items selected
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
                        'vid',
                        'vtype',
                        'loc',
                        'vchr',
                        'vs',
                        've',
                        'ea',
                        'noa',
                        'nor',
                        'beta',
                        'p',
                        'gene',
                        'pop',
                        'trait',
                        'ncase',
                        'ncontrol',
                        'nyear',
                        'pmid',
                      ];
                      const json2csvParser = new Parser({ fields });
                      const csv = json2csvParser.parse(selectitems3);
                      element.setAttribute(
                        'href',
                        'data:text/csv;charset=utf-8,' +
                        encodeURIComponent(csv),
                      );
                      element.setAttribute(
                        'download',
                        'SZGR_variants.csv',
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
      <Divider/>
      <Row>
        <Col md={4}>
          <Title level={2}>CRISPR</Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns5}
            bordered={true}
            options={false}
            dataSource={variants5}
            loading={loading5}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table5';
            }}
            search={false}
            pagination={{
              pageSize: pagesize5,
              total: total5,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading5(true);
              getRemoteVariantMPRA({
                pageSize: pagesize5,
                pageIndex: 1,
                vid:keywords.vid,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants5(res.data);
                setLoading5(false);
                setTotal5(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading5(true);
              getRemoteVariantMPRA({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants5(res.data);
                setLoading5(false);
                setTotal5(res.meta.total);
                setPagesize5(res.meta.pageSize);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex5(pagination.current);
              setPagesize5(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading5(true);
              if (name){
                getRemoteVariantMPRALike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants5(res.data);
                  setLoading5(false);
                  setTotal5(res.meta.total);
                });
              }else {
                getRemoteVariantMPRA({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants5(res.data);
                  setLoading5(false);
                  setTotal5(res.meta.total);
                });
              }
            }}
            rowSelection={{
              fixed: true,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                if (selected) {
                  let a = Array.from(new Set(selectitems5.concat(selectedRows)));
                  let b = a.filter((res) => res != undefined);
                  setSelectitems5(b);
                  let c = b.map((value) => value.id + 'table5');
                  setSelectitemsrowkey5(c);
                } else {
                  let b = selectitems.filter((x) => x.id != record.id);
                  setSelectitems5(b);
                  let c = b.map((value) => value.id + 'table5');
                  setSelectitemsrowkey5(c);
                }
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                if (selected) {
                  let a = uniqueArray(selectitems4.concat(changeRows), 'id');
                  let b = a.filter((res) => res != undefined);
                  setSelectitems5(b);
                  let c = b.map((value) => value.id + 'table5');
                  setSelectitemsrowkey5(c);
                } else {
                  let a = new Set();
                  changeRows.forEach((value) => {
                    a.add(value.id);
                  });
                  let b = selectitems4.filter((x) => !a.has(x.id));
                  setSelectitems5(b);
                  let c = b.map((value) => value.id + 'table5');
                  setSelectitemsrowkey5(c);
                }
              },
              selectedRowKeys: selectitemsrowkey5,
            }}
            tableAlertRender={({
                                 selectedRowKeys,
                                 selectedRows,
                                 onCleanSelected,
                               }) => {
              const onCancelselected = () => {
                setSelectitems5([]);
                setSelectitemsrowkey5([]);
              };
              return (
                <Space size={24}>
                  <span>
                    {selectitems5.length} items selected
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
                        'vid',
                        'vtype',
                        'loc',
                        'vchr',
                        'vs',
                        've',
                        'ea',
                        'noa',
                        'nor',
                        'beta',
                        'p',
                        'gene',
                        'pop',
                        'trait',
                        'ncase',
                        'ncontrol',
                        'nyear',
                        'pmid',
                      ];
                      const json2csvParser = new Parser({ fields });
                      const csv = json2csvParser.parse(selectitems3);
                      element.setAttribute(
                        'href',
                        'data:text/csv;charset=utf-8,' +
                        encodeURIComponent(csv),
                      );
                      element.setAttribute(
                        'download',
                        'SZGR_variants.csv',
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
      <Row>
        <Col md={4}>
          <Title level={2}>Curation</Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns6}
            bordered={true}
            options={false}
            dataSource={variants6}
            loading={loading6}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table5';
            }}
            search={false}
            pagination={{
              pageSize: pagesize6,
              total: total6,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading6(true);
              getRemoteVariantValidate({
                pageSize: pagesize6,
                pageIndex: 1,
                vid:keywords.vid,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants6(res.data);
                setLoading6(false);
                setTotal6(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading6(true);
              getRemoteVariantValidate({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants6(res.data);
                setLoading6(false);
                setTotal6(res.meta.total);
                setPagesize6(res.meta.pageSize);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex6(pagination.current);
              setPagesize6(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading6(true);
              if (name){
                getRemoteVariantValidate({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants6(res.data);
                  setLoading6(false);
                  setTotal6(res.meta.total);
                });
              }else {
                getRemoteVariantValidate({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants6(res.data);
                  setLoading6(false);
                  setTotal6(res.meta.total);
                });
              }
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
