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
  Typography, Input, Image
} from "antd";
import gsea_demo from '@/assets/gsea_demo.png';
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
    const res = [
      {
        "id": 14872148,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "LRP4",
        "weight": "0.323239984799947"
      },
      {
        "id": 14873329,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "SPNS1",
        "weight": "0.319311991920498"
      },
      {
        "id": 14874905,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "LRP4",
        "weight": "0.315235354682971"
      },
      {
        "id": 14876555,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "LRP4",
        "weight": "0.311647554276237"
      },
      {
        "id": 14876883,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "LRP4",
        "weight": "0.311030541187495"
      },
      {
        "id": 14877187,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "MFSD13A",
        "weight": "0.310472962098651"
      },
      {
        "id": 14886654,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "LRP4",
        "weight": "0.297503888859433"
      },
      {
        "id": 14886905,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "LRP4",
        "weight": "0.29724327314877"
      },
      {
        "id": 14888753,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "LRP4",
        "weight": "0.295349093599258"
      },
      {
        "id": 14895213,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "SPNS1",
        "weight": "0.289646279448212"
      },
      {
        "id": 14898362,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "LRP4",
        "weight": "0.287209817912768"
      },
      {
        "id": 14899142,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "SCUBE3",
        "weight": "0.286617037063763"
      },
      {
        "id": 14900474,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "LRP4",
        "weight": "0.285629672981251"
      },
      {
        "id": 14903017,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "MFSD13A",
        "weight": "0.283846331674122"
      },
      {
        "id": 14903184,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "LRP4",
        "weight": "0.283731411688046"
      },
      {
        "id": 14903312,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "MFSD14B",
        "weight": "0.283647256580571"
      },
      {
        "id": 14904690,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "ATF6B",
        "weight": "0.282745613738851"
      },
      {
        "id": 14907962,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "RIN3",
        "weight": "0.28057049316089"
      },
      {
        "id": 14912777,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "LRP4",
        "weight": "0.277694147655001"
      },
      {
        "id": 14914607,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "SPNS1",
        "weight": "0.276661707256654"
      },
      {
        "id": 14920624,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "SPNS1",
        "weight": "0.273428145366378"
      },
      {
        "id": 14921459,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "SPNS1",
        "weight": "0.273017868969082"
      },
      {
        "id": 14922483,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "ATF6B",
        "weight": "0.272532647600634"
      },
      {
        "id": 14922739,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "SPNS1",
        "weight": "0.272408995910628"
      },
      {
        "id": 14924999,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "ATF6B",
        "weight": "0.271306962545494"
      },
      {
        "id": 14936473,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "ATF6B",
        "weight": "0.266356708704042"
      },
      {
        "id": 14938302,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "HMOX2",
        "weight": "0.26562412063544"
      },
      {
        "id": 14941887,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "LRP4",
        "weight": "0.2642459994136"
      },
      {
        "id": 14942149,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "SPNS1",
        "weight": "0.264141965723339"
      },
      {
        "id": 14944431,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "SCUBE3",
        "weight": "0.263278068249011"
      },
      {
        "id": 14946212,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "WIPI1",
        "weight": "0.262613414296618"
      },
      {
        "id": 14948953,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "SPNS1",
        "weight": "0.261631480119338"
      },
      {
        "id": 14950032,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "MFSD14B",
        "weight": "0.261249055259145"
      },
      {
        "id": 14950113,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "LRP4",
        "weight": "0.261224627670481"
      },
      {
        "id": 14950180,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "BDNF-AS",
        "weight": "0.261200264323981"
      },
      {
        "id": 14950663,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "RIN3",
        "weight": "0.26103419049267"
      },
      {
        "id": 14950728,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "LRP4",
        "weight": "0.261013280561517"
      },
      {
        "id": 14950901,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SPNS1",
        "weight": "0.260959267574067"
      },
      {
        "id": 14950937,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "MFSD13A",
        "weight": "0.260947161003032"
      },
      {
        "id": 14951740,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "C11orf49",
        "weight": "0.260650574411157"
      },
      {
        "id": 14951923,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "CPQ",
        "weight": "0.260582736824408"
      },
      {
        "id": 14954212,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "BDNF-AS",
        "weight": "0.259811459595181"
      },
      {
        "id": 14957021,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "MFSD14B",
        "weight": "0.258878386140753"
      },
      {
        "id": 14957179,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "RPL29",
        "weight": "0.258820804616282"
      },
      {
        "id": 14958314,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "LRP4",
        "weight": "0.25846429919303"
      },
      {
        "id": 14959197,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "MFSD13A",
        "weight": "0.258196057801982"
      },
      {
        "id": 14959876,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "SCUBE3",
        "weight": "0.257979317583696"
      },
      {
        "id": 14960501,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "ATF6B",
        "weight": "0.257793811020589"
      },
      {
        "id": 14962593,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "RPL29",
        "weight": "0.257121303647764"
      },
      {
        "id": 14962929,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "MFSD13A",
        "weight": "0.257024657759515"
      },
      {
        "id": 14965781,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "MFSD14B",
        "weight": "0.256156722534906"
      },
      {
        "id": 14966314,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "MFSD13A",
        "weight": "0.255986936500759"
      },
      {
        "id": 14966391,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "RPL6",
        "weight": "0.255963509693184"
      },
      {
        "id": 14967065,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "LRP4",
        "weight": "0.255762490120985"
      },
      {
        "id": 14968093,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "BTF3",
        "weight": "0.255442742390943"
      },
      {
        "id": 14968728,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "TMEM116",
        "weight": "0.255260725378163"
      },
      {
        "id": 14969365,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "LRP4",
        "weight": "0.25506922845726"
      },
      {
        "id": 14970250,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "ATF6B",
        "weight": "0.254808208556373"
      },
      {
        "id": 14978102,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "SPNS1",
        "weight": "0.252601688413329"
      },
      {
        "id": 14981104,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "MFSD14B",
        "weight": "0.251804427747717"
      },
      {
        "id": 14981259,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "MFSD13A",
        "weight": "0.251766094733789"
      },
      {
        "id": 14981976,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "SPNS1",
        "weight": "0.251559042147294"
      },
      {
        "id": 14982112,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "SPCS1",
        "weight": "0.251521769023584"
      },
      {
        "id": 14983848,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "RPL6",
        "weight": "0.251051675715374"
      },
      {
        "id": 14988349,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "SCUBE3",
        "weight": "0.249850009422508"
      },
      {
        "id": 14988694,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SCUBE3",
        "weight": "0.249773480638494"
      },
      {
        "id": 14989136,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SPNS1",
        "weight": "0.249665218702432"
      },
      {
        "id": 14991575,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "CACNB2",
        "weight": "0.249062585990642"
      },
      {
        "id": 14993626,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "SRSF7",
        "weight": "0.248562426484644"
      },
      {
        "id": 14997806,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "LRP4",
        "weight": "0.247552883884991"
      },
      {
        "id": 14998215,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "HMOX2",
        "weight": "0.247461570677794"
      },
      {
        "id": 14999273,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RIN3",
        "gene": "SPNS1",
        "weight": "0.247227994607502"
      },
      {
        "id": 15000207,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "MFSD13A",
        "weight": "0.247025533049207"
      },
      {
        "id": 15000231,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "MFSD14B",
        "weight": "0.247019819456025"
      },
      {
        "id": 15005517,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "SPNS1",
        "weight": "0.245804542444324"
      },
      {
        "id": 15009898,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "PRKD3",
        "weight": "0.244817810711048"
      },
      {
        "id": 15014606,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "BDNF-AS",
        "weight": "0.243803472038563"
      },
      {
        "id": 15015519,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "RPL29",
        "weight": "0.24360715769935"
      },
      {
        "id": 15015927,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "CPQ",
        "weight": "0.243525948834724"
      },
      {
        "id": 15017415,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "BTF3",
        "weight": "0.243218510272449"
      },
      {
        "id": 15019757,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "LRP4",
        "weight": "0.242726115761793"
      },
      {
        "id": 15026317,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "MADD",
        "weight": "0.241414404909476"
      },
      {
        "id": 15026543,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CCNH",
        "weight": "0.241368816208388"
      },
      {
        "id": 15026909,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "LRP4",
        "weight": "0.241297588712959"
      },
      {
        "id": 15026999,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "WDR82",
        "weight": "0.241280462388412"
      },
      {
        "id": 15027725,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "RANGAP1",
        "weight": "0.241139523240779"
      },
      {
        "id": 15029765,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SRSF7",
        "weight": "0.24075607094126"
      },
      {
        "id": 15030593,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "CUTC",
        "weight": "0.240588338838765"
      },
      {
        "id": 15031303,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SCUBE3",
        "weight": "0.240457675578275"
      },
      {
        "id": 15032102,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "HMOX2",
        "weight": "0.240303531724306"
      },
      {
        "id": 15032890,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CPQ",
        "weight": "0.240155336744462"
      },
      {
        "id": 15036586,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "ATF6B",
        "weight": "0.239493333632185"
      },
      {
        "id": 15037348,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "MFSD13A",
        "weight": "0.239355283368292"
      },
      {
        "id": 15037610,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "CLPTM1",
        "weight": "0.239306441387036"
      },
      {
        "id": 15038191,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "BDNF-AS",
        "weight": "0.239201541626428"
      },
      {
        "id": 15038671,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "WIPI1",
        "weight": "0.239107006238939"
      },
      {
        "id": 15040467,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "CPQ",
        "weight": "0.238773120495239"
      },
      {
        "id": 15042092,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "RPL29",
        "weight": "0.238477473259758"
      },
      {
        "id": 15042363,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "C11orf49",
        "weight": "0.238432951006772"
      },
      {
        "id": 15042550,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "RIN3",
        "weight": "0.238399968134891"
      },
      {
        "id": 15043176,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "BDNF-AS",
        "weight": "0.238293668292145"
      },
      {
        "id": 15046035,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "RPL6",
        "weight": "0.237765763590786"
      },
      {
        "id": 15048895,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "SYNGR1",
        "weight": "0.237275914692285"
      },
      {
        "id": 15052559,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "MFSD14B",
        "weight": "0.236648010640103"
      },
      {
        "id": 15052935,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "RIN3",
        "weight": "0.236581405214663"
      },
      {
        "id": 15057594,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "BDNF-AS",
        "weight": "0.235781965561577"
      },
      {
        "id": 15057745,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "PRKD3",
        "weight": "0.235756060778463"
      },
      {
        "id": 15058058,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "SPNS1",
        "weight": "0.235703711306518"
      },
      {
        "id": 15059352,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CCNH",
        "weight": "0.235484740901842"
      },
      {
        "id": 15059886,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "NR1H3",
        "weight": "0.235399144759617"
      },
      {
        "id": 15060928,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "MFSD13A",
        "weight": "0.235223389856705"
      },
      {
        "id": 15060990,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "BDNF-AS",
        "weight": "0.235212812443359"
      },
      {
        "id": 15061666,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "RIN3",
        "weight": "0.235105207752682"
      },
      {
        "id": 15065353,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "CACNB2",
        "weight": "0.234516593628318"
      },
      {
        "id": 15065876,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "SGF29",
        "weight": "0.234433715706224"
      },
      {
        "id": 15066711,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "RPL29",
        "weight": "0.234298349872751"
      },
      {
        "id": 15068290,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "ATF6B",
        "weight": "0.234045957071747"
      },
      {
        "id": 15068941,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "MFSD13A",
        "weight": "0.233943697198882"
      },
      {
        "id": 15069261,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "SCUBE3",
        "weight": "0.233893452666708"
      },
      {
        "id": 15069555,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "SPNS1",
        "weight": "0.233847555893835"
      },
      {
        "id": 15069595,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "ATF6B",
        "weight": "0.233842343993556"
      },
      {
        "id": 15071049,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "TMEM116",
        "weight": "0.233608513618779"
      },
      {
        "id": 15071087,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "MFSD14B",
        "weight": "0.233602301249753"
      },
      {
        "id": 15071479,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "MFSD14B",
        "weight": "0.233539812453955"
      },
      {
        "id": 15071546,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "MTRF1L",
        "weight": "0.233531225478787"
      },
      {
        "id": 15072516,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "ATF6B",
        "weight": "0.233384010907664"
      },
      {
        "id": 15073323,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "MFSD13A",
        "weight": "0.233257233174889"
      },
      {
        "id": 15073371,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "C1QTNF4",
        "weight": "0.233248393595833"
      },
      {
        "id": 15073644,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "ATF6B",
        "weight": "0.233207850116923"
      },
      {
        "id": 15075125,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "INA",
        "weight": "0.232981030442548"
      },
      {
        "id": 15077344,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "RPL6",
        "weight": "0.232647679856481"
      },
      {
        "id": 15078403,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "RIN3",
        "weight": "0.232493804130857"
      },
      {
        "id": 15078733,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPNS1",
        "gene": "WIPI1",
        "weight": "0.23244237651222"
      },
      {
        "id": 15080059,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "RIN3",
        "weight": "0.232241638737877"
      },
      {
        "id": 15080193,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "KBTBD4",
        "weight": "0.232222309427762"
      },
      {
        "id": 15080854,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "SPNS1",
        "weight": "0.232124316020029"
      },
      {
        "id": 15081406,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "SPNS1",
        "weight": "0.232038086274788"
      },
      {
        "id": 15083396,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "TMEM9B",
        "weight": "0.231736808534352"
      },
      {
        "id": 15086217,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "CCNH",
        "weight": "0.231327255127276"
      },
      {
        "id": 15089151,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "RPL6",
        "weight": "0.230894921695363"
      },
      {
        "id": 15089728,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "RIN3",
        "weight": "0.230814581810567"
      },
      {
        "id": 15090645,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "HMOX2",
        "weight": "0.230678764903606"
      },
      {
        "id": 15091369,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "LRP4",
        "weight": "0.230579381249329"
      },
      {
        "id": 15092937,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CPQ",
        "weight": "0.230358562171794"
      },
      {
        "id": 15093141,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "ALDOA",
        "weight": "0.230326289133013"
      },
      {
        "id": 15095243,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "SPNS1",
        "weight": "0.230019290448997"
      },
      {
        "id": 15098733,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "BDNF-AS",
        "weight": "0.229534535469998"
      },
      {
        "id": 15100658,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "SPNS1",
        "weight": "0.229269629855126"
      },
      {
        "id": 15102823,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "WIPI1",
        "weight": "0.228979914767461"
      },
      {
        "id": 15103776,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "LRP4",
        "weight": "0.228853719424488"
      },
      {
        "id": 15104004,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "TMEM160",
        "weight": "0.228823505079157"
      },
      {
        "id": 15109151,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "HMOX2",
        "weight": "0.228128521721126"
      },
      {
        "id": 15111699,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "HMOX2",
        "weight": "0.22779386038966"
      },
      {
        "id": 15113159,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "MTRF1L",
        "weight": "0.227609914285194"
      },
      {
        "id": 15113967,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "ALDOA",
        "weight": "0.227504298501374"
      },
      {
        "id": 15114135,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "BTF3",
        "weight": "0.227481691850259"
      },
      {
        "id": 15115686,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "GTF3C1",
        "weight": "0.227277105160954"
      },
      {
        "id": 15116097,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "SPNS1",
        "weight": "0.227225112593464"
      },
      {
        "id": 15116524,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SRSF7",
        "weight": "0.227167627973018"
      },
      {
        "id": 15118858,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "SPNS1",
        "weight": "0.226884045999009"
      },
      {
        "id": 15121324,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "RPL6",
        "weight": "0.226569702290914"
      },
      {
        "id": 15122018,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "LRP4",
        "weight": "0.226480940176323"
      },
      {
        "id": 15126145,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "TMEM9B",
        "weight": "0.225960350037012"
      },
      {
        "id": 15126263,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM116",
        "gene": "SPNS1",
        "weight": "0.22594787024481"
      },
      {
        "id": 15127476,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "RPL29",
        "weight": "0.225795691799813"
      },
      {
        "id": 15127860,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "BPTF",
        "weight": "0.225746283208153"
      },
      {
        "id": 15128022,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "RANGAP1",
        "weight": "0.225724347971059"
      },
      {
        "id": 15129530,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "CDC123",
        "weight": "0.22554508955498"
      },
      {
        "id": 15129640,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "SPNS1",
        "weight": "0.225529539864459"
      },
      {
        "id": 15133290,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "ZNF76",
        "weight": "0.225083552540428"
      },
      {
        "id": 15133727,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "SCUBE3",
        "weight": "0.225035037245693"
      },
      {
        "id": 15138195,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "RPL6",
        "weight": "0.22450725061127"
      },
      {
        "id": 15140679,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "LRP4",
        "weight": "0.224217708817029"
      },
      {
        "id": 15140946,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "SPCS1",
        "weight": "0.224183289848263"
      },
      {
        "id": 15141325,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "TMEM9B",
        "weight": "0.224139976707527"
      },
      {
        "id": 15141521,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "ALDOA",
        "weight": "0.224116670501963"
      },
      {
        "id": 15143511,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "MADD",
        "weight": "0.223889835038256"
      },
      {
        "id": 15144043,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "HMOX2",
        "weight": "0.22382544492452"
      },
      {
        "id": 15144291,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "BDNF-AS",
        "weight": "0.223798706328149"
      },
      {
        "id": 15145373,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "ATP9A",
        "weight": "0.223673941342808"
      },
      {
        "id": 15146253,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "SPCS1",
        "weight": "0.223571207784871"
      },
      {
        "id": 15146786,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "HMOX2",
        "weight": "0.223511182666692"
      },
      {
        "id": 15146902,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "SCUBE3",
        "weight": "0.223499455481515"
      },
      {
        "id": 15149985,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "BDNF-AS",
        "weight": "0.223160105369903"
      },
      {
        "id": 15151253,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "BTF3",
        "weight": "0.223007294861483"
      },
      {
        "id": 15154747,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "WIPI1",
        "weight": "0.222615697592072"
      },
      {
        "id": 15155692,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "SCUBE3",
        "weight": "0.222512435855533"
      },
      {
        "id": 15156107,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "LRP4",
        "weight": "0.222467486520189"
      },
      {
        "id": 15157190,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "MFSD14B",
        "weight": "0.222351773820883"
      },
      {
        "id": 15158360,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "C11orf49",
        "weight": "0.22221671802516"
      },
      {
        "id": 15158497,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "HMOX2",
        "weight": "0.222201762862309"
      },
      {
        "id": 15159142,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "ATF6B",
        "weight": "0.222130994454356"
      },
      {
        "id": 15160463,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "HMOX2",
        "weight": "0.221984274688887"
      },
      {
        "id": 15161994,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "LRP4",
        "weight": "0.221817186816224"
      },
      {
        "id": 15162919,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "NFE2L1",
        "weight": "0.221713473925328"
      },
      {
        "id": 15165417,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "RANGAP1",
        "weight": "0.221444922480409"
      },
      {
        "id": 15165607,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "HMOX2",
        "weight": "0.221426312644"
      },
      {
        "id": 15167090,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "PRKD3",
        "weight": "0.221271110033409"
      },
      {
        "id": 15168137,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "TMEM9B",
        "weight": "0.221158388657892"
      },
      {
        "id": 15169670,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "MFSD14B",
        "weight": "0.221001780692532"
      },
      {
        "id": 15170739,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "MFSD13A",
        "weight": "0.220892110741083"
      },
      {
        "id": 15172018,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "SPNS1",
        "weight": "0.220756546915783"
      },
      {
        "id": 15172309,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CLPTM1",
        "weight": "0.220723149628758"
      },
      {
        "id": 15173583,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "WIPI1",
        "weight": "0.220592084126836"
      },
      {
        "id": 15174250,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "ALDOA",
        "weight": "0.220525850242103"
      },
      {
        "id": 15175607,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "RPL29",
        "weight": "0.220374552340483"
      },
      {
        "id": 15176079,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "WIPI1",
        "weight": "0.220328298780735"
      },
      {
        "id": 15177683,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "LRP4",
        "weight": "0.220159221459143"
      },
      {
        "id": 15181644,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "WIPI1",
        "weight": "0.21975621653531"
      },
      {
        "id": 15182167,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "ALDOA",
        "weight": "0.21970491935024"
      },
      {
        "id": 15184736,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CACNB2",
        "gene": "SPNS1",
        "weight": "0.219445659811432"
      },
      {
        "id": 15186657,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "MFSD13A",
        "weight": "0.219249637947016"
      },
      {
        "id": 15187295,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "CUTC",
        "weight": "0.219182346479756"
      },
      {
        "id": 15187407,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "SRSF7",
        "weight": "0.219171986193129"
      },
      {
        "id": 15188177,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "RPL27A",
        "weight": "0.21909063022756"
      },
      {
        "id": 15191119,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "LRP4",
        "weight": "0.218800294247242"
      },
      {
        "id": 15193259,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "WIPI1",
        "weight": "0.218596734323153"
      },
      {
        "id": 15193953,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "SYNGR1",
        "weight": "0.218530624721853"
      },
      {
        "id": 15196921,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "MFSD14B",
        "weight": "0.218232059267278"
      },
      {
        "id": 15197732,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "SCUBE3",
        "weight": "0.218154745391365"
      },
      {
        "id": 15198211,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "TMEM116",
        "weight": "0.218106739512342"
      },
      {
        "id": 15198671,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "C1QTNF4",
        "weight": "0.218062082243338"
      },
      {
        "id": 15199173,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "C11orf49",
        "weight": "0.218016307523923"
      },
      {
        "id": 15199426,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "LRP4",
        "weight": "0.217993124152086"
      },
      {
        "id": 15205075,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "MTRF1L",
        "weight": "0.217441534695808"
      },
      {
        "id": 15205131,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "SCUBE3",
        "weight": "0.217437135663674"
      },
      {
        "id": 15207749,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "MFSD13A",
        "weight": "0.217189402440975"
      },
      {
        "id": 15210437,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "BDNF-AS",
        "weight": "0.216937983982645"
      },
      {
        "id": 15211100,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "BPTF",
        "weight": "0.216875978880201"
      },
      {
        "id": 15211478,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYNGR1",
        "gene": "RANGAP1",
        "weight": "0.216838799620801"
      },
      {
        "id": 15211875,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "SYT11",
        "weight": "0.216801485089224"
      },
      {
        "id": 15214408,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "LRP4",
        "weight": "0.216559199413496"
      },
      {
        "id": 15215124,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ALDOA",
        "gene": "CALM3",
        "weight": "0.216489712179629"
      },
      {
        "id": 15215372,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "C11orf49",
        "weight": "0.216465579127436"
      },
      {
        "id": 15216114,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "TUFM",
        "weight": "0.21639636722656"
      },
      {
        "id": 15217149,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "MTRF1L",
        "weight": "0.216302544687449"
      },
      {
        "id": 15218526,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "SYNGR1",
        "weight": "0.216173679703273"
      },
      {
        "id": 15218617,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "CLPTM1",
        "weight": "0.216164758591068"
      },
      {
        "id": 15220461,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "MFSD14B",
        "weight": "0.215998309206928"
      },
      {
        "id": 15220875,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "PRKD3",
        "weight": "0.215961145264741"
      },
      {
        "id": 15222968,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "KBTBD4",
        "weight": "0.215768730154851"
      },
      {
        "id": 15223665,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "RIN3",
        "weight": "0.215708673110554"
      },
      {
        "id": 15224369,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "SGF29",
        "weight": "0.215642125987568"
      },
      {
        "id": 15224517,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "RANGAP1",
        "weight": "0.215628474963415"
      },
      {
        "id": 15224566,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "LRP4",
        "weight": "0.215624088045741"
      },
      {
        "id": 15224609,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "MFSD13A",
        "weight": "0.215618281101992"
      },
      {
        "id": 15224802,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "C11orf49",
        "weight": "0.215601108670204"
      },
      {
        "id": 15225191,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "LRP4",
        "weight": "0.215564779787934"
      },
      {
        "id": 15228200,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "RPL29",
        "weight": "0.215295638232246"
      },
      {
        "id": 15228271,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "BTF3",
        "weight": "0.215287859229105"
      },
      {
        "id": 15229392,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "SPNS1",
        "weight": "0.215185524055406"
      },
      {
        "id": 15230189,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "RIN3",
        "weight": "0.215111728014537"
      },
      {
        "id": 15230350,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "BDNF-AS",
        "weight": "0.215095186638143"
      },
      {
        "id": 15230893,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "BAP1",
        "weight": "0.215045442759131"
      },
      {
        "id": 15231327,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "MFSD14B",
        "weight": "0.215007535964362"
      },
      {
        "id": 15233918,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "RPL6",
        "weight": "0.214769613211054"
      },
      {
        "id": 15234800,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "MFSD13A",
        "weight": "0.214697373216756"
      },
      {
        "id": 15236049,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "RPL6",
        "weight": "0.214589440095656"
      },
      {
        "id": 15236082,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "MFSD13A",
        "weight": "0.214587672961733"
      },
      {
        "id": 15236810,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "GTF3C1",
        "weight": "0.214523835456862"
      },
      {
        "id": 15238842,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "RPL6",
        "weight": "0.214349566708429"
      },
      {
        "id": 15240853,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "SPNS1",
        "weight": "0.214174246881371"
      },
      {
        "id": 15240893,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "MTRF1L",
        "weight": "0.214171296623608"
      },
      {
        "id": 15240971,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "CHGA",
        "weight": "0.21416475061241"
      },
      {
        "id": 15241915,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CACNB2",
        "gene": "MFSD13A",
        "weight": "0.214085266592772"
      },
      {
        "id": 15243166,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "TMEM116",
        "weight": "0.213976047979247"
      },
      {
        "id": 15243227,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "TMEM116",
        "weight": "0.213970227955467"
      },
      {
        "id": 15243574,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "SPCS1",
        "weight": "0.213940744205923"
      },
      {
        "id": 15243795,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BPTF",
        "gene": "RANGAP1",
        "weight": "0.213921350496716"
      },
      {
        "id": 15244712,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "TUFM",
        "weight": "0.213840694736901"
      },
      {
        "id": 15244854,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "SPNS1",
        "weight": "0.21382711098016"
      },
      {
        "id": 15247619,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "NR1H3",
        "weight": "0.213586262403108"
      },
      {
        "id": 15248169,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "C1QTNF4",
        "weight": "0.213538119175401"
      },
      {
        "id": 15248333,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "RPL6",
        "weight": "0.213523289802784"
      },
      {
        "id": 15249784,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "PRKD3",
        "weight": "0.213400596260561"
      },
      {
        "id": 15252006,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "RPL27A",
        "weight": "0.21321268144912"
      },
      {
        "id": 15252524,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPNS1",
        "gene": "CLPTM1",
        "weight": "0.21316971532536"
      },
      {
        "id": 15253599,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "ITSN2",
        "weight": "0.213079051575269"
      },
      {
        "id": 15255027,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "TUFM",
        "weight": "0.212958064732828"
      },
      {
        "id": 15255526,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "SRSF7",
        "weight": "0.212919511993996"
      },
      {
        "id": 15256077,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CCNH",
        "weight": "0.212872797867571"
      },
      {
        "id": 15256125,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "C6orf1",
        "weight": "0.21286877099477"
      },
      {
        "id": 15257849,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "INA",
        "weight": "0.212725435250742"
      },
      {
        "id": 15260303,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "HACD1",
        "weight": "0.212519140689219"
      },
      {
        "id": 15261315,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "INA",
        "weight": "0.212434735498597"
      },
      {
        "id": 15262211,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "MFSD14B",
        "weight": "0.212361394083142"
      },
      {
        "id": 15265056,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "TMEM116",
        "weight": "0.212126386951703"
      },
      {
        "id": 15265398,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "TMEM9B",
        "weight": "0.212097823813216"
      },
      {
        "id": 15266487,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CPQ",
        "weight": "0.212011416394786"
      },
      {
        "id": 15268306,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GTF3C1",
        "gene": "RANGAP1",
        "weight": "0.211865866788683"
      },
      {
        "id": 15268579,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SYT11",
        "gene": "MEF2D",
        "weight": "0.211842529178299"
      },
      {
        "id": 15269472,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "TMEM116",
        "weight": "0.211772286917348"
      },
      {
        "id": 15270845,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "SYT11",
        "weight": "0.211665159770183"
      },
      {
        "id": 15271446,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "ATP9A",
        "weight": "0.211614188817508"
      },
      {
        "id": 15271975,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "BTF3",
        "weight": "0.211572665266544"
      },
      {
        "id": 15274485,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CPQ",
        "weight": "0.211372389472456"
      },
      {
        "id": 15274670,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "KBTBD4",
        "weight": "0.211358158631755"
      },
      {
        "id": 15275105,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "BDNF-AS",
        "weight": "0.211322150174819"
      },
      {
        "id": 15275125,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "MFSD13A",
        "weight": "0.21131994174278"
      },
      {
        "id": 15277525,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CUTC",
        "weight": "0.211127469834775"
      },
      {
        "id": 15278048,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "ALDOA",
        "weight": "0.211085578838329"
      },
      {
        "id": 15278191,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "CACNB2",
        "weight": "0.211074746136859"
      },
      {
        "id": 15279191,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "TUFM",
        "weight": "0.210994430872387"
      },
      {
        "id": 15279487,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "RANGAP1",
        "weight": "0.210969902851037"
      },
      {
        "id": 15279542,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "ALDOA",
        "weight": "0.210965807263885"
      },
      {
        "id": 15283318,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "CPQ",
        "weight": "0.210664994828483"
      },
      {
        "id": 15283552,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "CACNB2",
        "weight": "0.210647737129681"
      },
      {
        "id": 15285197,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "RPL29",
        "weight": "0.210521741734334"
      },
      {
        "id": 15290452,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "ATF6B",
        "weight": "0.210111251269348"
      },
      {
        "id": 15291394,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "HMOX2",
        "weight": "0.21003923121673"
      },
      {
        "id": 15292667,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "ATF6B",
        "weight": "0.209941029526343"
      },
      {
        "id": 15292693,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "SYNGR1",
        "weight": "0.209938588985295"
      },
      {
        "id": 15293491,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "C11orf49",
        "weight": "0.209879192972994"
      },
      {
        "id": 15293953,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SPCS1",
        "weight": "0.209843404603733"
      },
      {
        "id": 15294138,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CCNH",
        "weight": "0.209828955429841"
      },
      {
        "id": 15294566,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "TMEM9B",
        "weight": "0.209796284102603"
      },
      {
        "id": 15295353,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "WIPI1",
        "weight": "0.209732887449935"
      },
      {
        "id": 15295379,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TUFM",
        "gene": "ALDOA",
        "weight": "0.209730780968531"
      },
      {
        "id": 15296012,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "RPL29",
        "weight": "0.209681947310752"
      },
      {
        "id": 15299208,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "GNL3",
        "weight": "0.209441211360861"
      },
      {
        "id": 15299230,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "BTF3",
        "weight": "0.209439414127367"
      },
      {
        "id": 15302635,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "BPTF",
        "weight": "0.20918505197541"
      },
      {
        "id": 15303787,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATP9A",
        "gene": "RANGAP1",
        "weight": "0.209099669216173"
      },
      {
        "id": 15304115,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "SPNS1",
        "weight": "0.209076021417573"
      },
      {
        "id": 15305927,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "GTF3C1",
        "weight": "0.20894781745772"
      },
      {
        "id": 15306014,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "CCNH",
        "weight": "0.208940437013226"
      },
      {
        "id": 15309404,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "ALDOA",
        "weight": "0.208688939591285"
      },
      {
        "id": 15310143,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "YY1AP1",
        "weight": "0.208633394454627"
      },
      {
        "id": 15311612,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "RPL27A",
        "weight": "0.208524726962442"
      },
      {
        "id": 15312244,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "BTF3",
        "weight": "0.208478365496179"
      },
      {
        "id": 15312358,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "BDNF-AS",
        "weight": "0.208470930913202"
      },
      {
        "id": 15312637,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "TMEM160",
        "weight": "0.208450450512357"
      },
      {
        "id": 15313413,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CLPTM1",
        "weight": "0.208395800462176"
      },
      {
        "id": 15314551,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "SPCS1",
        "weight": "0.208309031637435"
      },
      {
        "id": 15314956,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "TMEM160",
        "weight": "0.208281345550813"
      },
      {
        "id": 15315118,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SGF29",
        "gene": "SPNS1",
        "weight": "0.208269041812909"
      },
      {
        "id": 15318159,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "EIF4A2",
        "weight": "0.208050826099128"
      },
      {
        "id": 15318613,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CLPTM1",
        "weight": "0.208019070396105"
      },
      {
        "id": 15321311,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "TMEM160",
        "weight": "0.207821975708911"
      },
      {
        "id": 15324096,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "WIPI1",
        "weight": "0.207625169807788"
      },
      {
        "id": 15325374,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CACNB2",
        "weight": "0.207532622594967"
      },
      {
        "id": 15326018,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "SPCS1",
        "weight": "0.207489787935706"
      },
      {
        "id": 15326579,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "BTF3",
        "weight": "0.207450532954336"
      },
      {
        "id": 15331708,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "CACNB2",
        "weight": "0.20707907523521"
      },
      {
        "id": 15332259,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM160",
        "gene": "RANGAP1",
        "weight": "0.207039433577271"
      },
      {
        "id": 15334015,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "SPNS1",
        "weight": "0.206920195061469"
      },
      {
        "id": 15335043,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "ZNF76",
        "weight": "0.206852691776304"
      },
      {
        "id": 15335371,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM160",
        "gene": "SYNGR1",
        "weight": "0.206830279734075"
      },
      {
        "id": 15335512,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "TMEM116",
        "weight": "0.206821096522489"
      },
      {
        "id": 15337603,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "ALDOA",
        "weight": "0.206679746888568"
      },
      {
        "id": 15341034,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "ALDOA",
        "weight": "0.206440096784937"
      },
      {
        "id": 15342076,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "WIPI1",
        "weight": "0.20636477687787"
      },
      {
        "id": 15342367,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "CDC123",
        "weight": "0.20634683778486"
      },
      {
        "id": 15342871,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CDC123",
        "weight": "0.206313135573735"
      },
      {
        "id": 15344760,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "C6orf1",
        "weight": "0.206188106495723"
      },
      {
        "id": 15345460,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "TMEM67",
        "weight": "0.206141473731328"
      },
      {
        "id": 15345861,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "BTF3",
        "weight": "0.206114206668887"
      },
      {
        "id": 15346452,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "TMEM9B",
        "weight": "0.206076916753352"
      },
      {
        "id": 15346693,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "MTRF1L",
        "weight": "0.206061314214208"
      },
      {
        "id": 15349427,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "ATP9A",
        "weight": "0.205877318647369"
      },
      {
        "id": 15350972,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "SPNS1",
        "weight": "0.205767215533094"
      },
      {
        "id": 15353324,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "CUTC",
        "weight": "0.205611745823108"
      },
      {
        "id": 15354671,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "SCUBE3",
        "weight": "0.205519169209777"
      },
      {
        "id": 15354995,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "MFSD13A",
        "weight": "0.205496809359878"
      },
      {
        "id": 15356808,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "SMIM4",
        "weight": "0.20537343562847"
      },
      {
        "id": 15357783,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "C6orf1",
        "weight": "0.205309783098364"
      },
      {
        "id": 15359034,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "SRSF7",
        "weight": "0.205229284684708"
      },
      {
        "id": 15360465,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SPCS1",
        "weight": "0.205134207506614"
      },
      {
        "id": 15362226,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "MADD",
        "weight": "0.205013435803747"
      },
      {
        "id": 15368973,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "MFSD14B",
        "weight": "0.204567940540061"
      },
      {
        "id": 15370780,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "NFE2L1",
        "weight": "0.204454570194337"
      },
      {
        "id": 15374440,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "CLPTM1",
        "weight": "0.204215636449179"
      },
      {
        "id": 15374663,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "SYNGR1",
        "weight": "0.204202599757586"
      },
      {
        "id": 15378844,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "MTRF1L",
        "weight": "0.203932163796168"
      },
      {
        "id": 15379799,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "TMEM9B",
        "weight": "0.203868796401982"
      },
      {
        "id": 15381884,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "ATF6B",
        "weight": "0.203739940202"
      },
      {
        "id": 15384293,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "MFSD14B",
        "weight": "0.203580878530194"
      },
      {
        "id": 15385207,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "ZNF76",
        "weight": "0.203523175635423"
      },
      {
        "id": 15389270,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "SPCS1",
        "weight": "0.203271412687722"
      },
      {
        "id": 15390699,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "KBTBD4",
        "weight": "0.203181394093723"
      },
      {
        "id": 15391222,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "ATF6B",
        "weight": "0.203150167016872"
      },
      {
        "id": 15393185,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "SPNS1",
        "weight": "0.203029465798803"
      },
      {
        "id": 15394598,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "MFSD13A",
        "weight": "0.202939110435197"
      },
      {
        "id": 15395000,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "ATF6B",
        "weight": "0.202914051439389"
      },
      {
        "id": 15395531,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CACNB2",
        "weight": "0.20288224636896"
      },
      {
        "id": 15397738,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "BDNF-AS",
        "weight": "0.202746296198128"
      },
      {
        "id": 15397876,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "SMIM4",
        "weight": "0.202739339771368"
      },
      {
        "id": 15397986,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "NR1H3",
        "weight": "0.202731887919762"
      },
      {
        "id": 15400123,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "NFE2L1",
        "weight": "0.202601977713334"
      },
      {
        "id": 15400227,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "CALM3",
        "weight": "0.20259540695039"
      },
      {
        "id": 15400242,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NFE2L1",
        "gene": "RANGAP1",
        "weight": "0.202594699206065"
      },
      {
        "id": 15400359,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "SPNS1",
        "weight": "0.202587652530138"
      },
      {
        "id": 15400965,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "MADD",
        "weight": "0.202551846478858"
      },
      {
        "id": 15401163,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "BDNF-AS",
        "weight": "0.202540445621467"
      },
      {
        "id": 15401531,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "CUTC",
        "weight": "0.202516008576901"
      },
      {
        "id": 15405958,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "RANGAP1",
        "weight": "0.202247529070949"
      },
      {
        "id": 15406575,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "ALDOA",
        "weight": "0.202210536365309"
      },
      {
        "id": 15407192,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "MFSD13A",
        "weight": "0.202174291623398"
      },
      {
        "id": 15407609,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CALM3",
        "weight": "0.202148889401253"
      },
      {
        "id": 15408233,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "BTF3",
        "weight": "0.202106396500772"
      },
      {
        "id": 15408408,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "ATF6B",
        "weight": "0.202094054298079"
      },
      {
        "id": 15411249,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "NR1H3",
        "weight": "0.201924952270713"
      },
      {
        "id": 15411974,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "CLPTM1",
        "weight": "0.201884376651935"
      },
      {
        "id": 15413934,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "SMIM4",
        "weight": "0.201767698497164"
      },
      {
        "id": 15414636,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "HMOX2",
        "weight": "0.201726875036838"
      },
      {
        "id": 15415247,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "ZNF76",
        "weight": "0.20169145836069"
      },
      {
        "id": 15421371,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "SGF29",
        "weight": "0.201330174207415"
      },
      {
        "id": 15422571,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "KBTBD4",
        "weight": "0.201260219686085"
      },
      {
        "id": 15423263,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "ATF6B",
        "weight": "0.201220630621284"
      },
      {
        "id": 15424197,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "SPNS1",
        "weight": "0.201163247193536"
      },
      {
        "id": 15426548,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "RANGAP1",
        "weight": "0.201024068861074"
      },
      {
        "id": 15427968,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "CUTC",
        "weight": "0.200937039513372"
      },
      {
        "id": 15430840,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "ZNF76",
        "weight": "0.200771556902386"
      },
      {
        "id": 15431148,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CLPTM1",
        "weight": "0.200752419854238"
      },
      {
        "id": 15432066,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "SPNS1",
        "weight": "0.200699719281148"
      },
      {
        "id": 15433780,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "BTF3",
        "weight": "0.20059998666507"
      },
      {
        "id": 15434596,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CALM3",
        "weight": "0.20055294555505"
      },
      {
        "id": 15436882,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "BDNF-AS",
        "weight": "0.200425031333614"
      },
      {
        "id": 15437722,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "KBTBD4",
        "weight": "0.200375879170618"
      },
      {
        "id": 15440489,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "MFSD13A",
        "weight": "0.200214462284998"
      },
      {
        "id": 15442678,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "RIN3",
        "weight": "0.200086643251036"
      },
      {
        "id": 15443177,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "SRSF7",
        "weight": "0.200058582713744"
      },
      {
        "id": 15443973,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "TMEM160",
        "weight": "0.200014124843877"
      },
      {
        "id": 15445407,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "MADD",
        "weight": "0.199933445780505"
      },
      {
        "id": 15447686,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "MADD",
        "weight": "0.199808574064619"
      },
      {
        "id": 15453217,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GTF3C1",
        "gene": "SYNGR1",
        "weight": "0.199490169132318"
      },
      {
        "id": 15453327,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "WDR82",
        "weight": "0.199483265098794"
      },
      {
        "id": 15453905,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CUTC",
        "weight": "0.199452689198684"
      },
      {
        "id": 15454766,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "ATF6B",
        "weight": "0.199402670375225"
      },
      {
        "id": 15455268,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "CHGA",
        "weight": "0.199376211574628"
      },
      {
        "id": 15456407,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GTF3C1",
        "gene": "BPTF",
        "weight": "0.199310442567471"
      },
      {
        "id": 15457195,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "CLPTM1",
        "weight": "0.199269001643272"
      },
      {
        "id": 15458669,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "SPCS1",
        "weight": "0.199187911756742"
      },
      {
        "id": 15461104,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "BDNF-AS",
        "weight": "0.199052739089142"
      },
      {
        "id": 15461731,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "HMOX2",
        "weight": "0.199018868469924"
      },
      {
        "id": 15461764,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "INA",
        "weight": "0.199016890241622"
      },
      {
        "id": 15462811,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "SPNS1",
        "weight": "0.198956289982892"
      },
      {
        "id": 15472327,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "CLPTM1",
        "weight": "0.198428501986796"
      },
      {
        "id": 15472565,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "ALDOA",
        "weight": "0.198416268797748"
      },
      {
        "id": 15474024,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "NR1H3",
        "weight": "0.198337208542728"
      },
      {
        "id": 15476148,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "C6orf1",
        "weight": "0.19822324208287"
      },
      {
        "id": 15477917,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "RPL6",
        "weight": "0.198126403273503"
      },
      {
        "id": 15478552,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NFE2L1",
        "gene": "SYNGR1",
        "weight": "0.198092164535031"
      },
      {
        "id": 15480415,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "BPTF",
        "weight": "0.197994096032201"
      },
      {
        "id": 15481841,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "SGF29",
        "weight": "0.197920568017405"
      },
      {
        "id": 15483105,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BPTF",
        "gene": "ATP9A",
        "weight": "0.197853871605189"
      },
      {
        "id": 15484203,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "RANGAP1",
        "weight": "0.197794997841257"
      },
      {
        "id": 15484826,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "KBTBD4",
        "weight": "0.197762173705217"
      },
      {
        "id": 15486984,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "HMOX2",
        "weight": "0.197645719702223"
      },
      {
        "id": 15488521,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "RPL6",
        "weight": "0.197564120499152"
      },
      {
        "id": 15488898,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "SCUBE3",
        "weight": "0.197544271792338"
      },
      {
        "id": 15489895,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "ATF6B",
        "weight": "0.197493773960938"
      },
      {
        "id": 15490296,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "SYNGR1",
        "weight": "0.197472567456931"
      },
      {
        "id": 15491565,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "SPNS1",
        "weight": "0.197405108845558"
      },
      {
        "id": 15492614,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "SGF29",
        "weight": "0.197350927636601"
      },
      {
        "id": 15493858,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "CLPTM1",
        "weight": "0.197285309889641"
      },
      {
        "id": 15498481,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "SPNS1",
        "weight": "0.197043685787113"
      },
      {
        "id": 15500451,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "BAP1",
        "weight": "0.196943944542262"
      },
      {
        "id": 15500814,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "RANGAP1",
        "weight": "0.196926277536393"
      },
      {
        "id": 15502804,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "ALDOA",
        "weight": "0.196824589368164"
      },
      {
        "id": 15503375,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "RPL6",
        "weight": "0.196794862495109"
      },
      {
        "id": 15503771,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "SGF29",
        "weight": "0.196775521630399"
      },
      {
        "id": 15505201,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "HMOX2",
        "weight": "0.19670269645901"
      },
      {
        "id": 15505992,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "WDR82",
        "weight": "0.196663425021677"
      },
      {
        "id": 15506733,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "CPQ",
        "weight": "0.196623513683982"
      },
      {
        "id": 15506861,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "RPL6",
        "weight": "0.196617972054907"
      },
      {
        "id": 15512855,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "NFE2L1",
        "weight": "0.196310934471874"
      },
      {
        "id": 15514732,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "C11orf49",
        "weight": "0.196215851225206"
      },
      {
        "id": 15515807,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "TMEM160",
        "weight": "0.196160515560801"
      },
      {
        "id": 15516062,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "ALDOA",
        "weight": "0.196146119401254"
      },
      {
        "id": 15516326,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "KBTBD4",
        "weight": "0.196131880288396"
      },
      {
        "id": 15518512,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "SGF29",
        "weight": "0.196017834932429"
      },
      {
        "id": 15518658,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "RPL27A",
        "weight": "0.196011183986428"
      },
      {
        "id": 15520710,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "NR1H3",
        "weight": "0.195909124350157"
      },
      {
        "id": 15521681,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "KBTBD4",
        "weight": "0.195860079104249"
      },
      {
        "id": 15522719,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "SCUBE3",
        "weight": "0.195809648087036"
      },
      {
        "id": 15523891,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "HMOX2",
        "weight": "0.195750383540975"
      },
      {
        "id": 15524338,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATP9A",
        "gene": "SYNGR1",
        "weight": "0.195727657645438"
      },
      {
        "id": 15527020,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BPTF",
        "gene": "SYNGR1",
        "weight": "0.19559534757779"
      },
      {
        "id": 15527507,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "KBTBD4",
        "weight": "0.195571478150254"
      },
      {
        "id": 15528227,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "WDR82",
        "weight": "0.195536034532124"
      },
      {
        "id": 15529140,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MADD",
        "gene": "CHGA",
        "weight": "0.195492496958731"
      },
      {
        "id": 15532108,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "HMOX2",
        "weight": "0.195351614491897"
      },
      {
        "id": 15532411,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "CACNB2",
        "weight": "0.195335619675404"
      },
      {
        "id": 15532508,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "WIPI1",
        "weight": "0.195331145167183"
      },
      {
        "id": 15533456,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "HACD1",
        "weight": "0.195286434408963"
      },
      {
        "id": 15534297,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "MADD",
        "weight": "0.195242974110272"
      },
      {
        "id": 15534790,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "GNL3",
        "weight": "0.195218373494762"
      },
      {
        "id": 15535300,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "BTF3",
        "weight": "0.195192941331212"
      },
      {
        "id": 15535455,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "SPNS1",
        "weight": "0.195186021013865"
      },
      {
        "id": 15536750,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WDR82",
        "gene": "CHGA",
        "weight": "0.195123211402268"
      },
      {
        "id": 15537316,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "RPL27A",
        "weight": "0.195095935014609"
      },
      {
        "id": 15537939,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "C11orf49",
        "weight": "0.195065413954335"
      },
      {
        "id": 15539982,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "MFSD13A",
        "weight": "0.194961755934153"
      },
      {
        "id": 15543501,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "SPNS1",
        "weight": "0.194789164067945"
      },
      {
        "id": 15544027,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "ALDOA",
        "weight": "0.194763218939892"
      },
      {
        "id": 15545203,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "SPCS1",
        "weight": "0.194703569509647"
      },
      {
        "id": 15545357,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "RANGAP1",
        "weight": "0.194695801599122"
      },
      {
        "id": 15597897,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "GNL3",
        "weight": "0.194531126039344"
      },
      {
        "id": 15598981,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "FEZ2",
        "weight": "0.194478625784049"
      },
      {
        "id": 15603251,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "GTF3C1",
        "weight": "0.194270840360432"
      },
      {
        "id": 15604930,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "MFSD13A",
        "weight": "0.194189405398066"
      },
      {
        "id": 15607369,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "TMEM116",
        "weight": "0.194075124849654"
      },
      {
        "id": 15607480,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "RPL6",
        "weight": "0.194070262476008"
      },
      {
        "id": 15608183,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "RANGAP1",
        "weight": "0.194037662521633"
      },
      {
        "id": 15608784,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "SPNS1",
        "weight": "0.194010745411271"
      },
      {
        "id": 15610590,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "TUFM",
        "weight": "0.19392615053539"
      },
      {
        "id": 15611094,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "TUFM",
        "weight": "0.193902183761971"
      },
      {
        "id": 15613384,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NFE2L1",
        "gene": "TMEM160",
        "weight": "0.193792926174777"
      },
      {
        "id": 15613767,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "WIPI1",
        "weight": "0.193773498553574"
      },
      {
        "id": 15614653,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "CCNH",
        "weight": "0.193732560831351"
      },
      {
        "id": 15622453,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "SRSF7",
        "weight": "0.193359431130601"
      },
      {
        "id": 15622582,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "SCUBE3",
        "weight": "0.19335402832576"
      },
      {
        "id": 15625506,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CDC123",
        "weight": "0.193217871024179"
      },
      {
        "id": 15626483,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "MFSD14B",
        "weight": "0.19317064575427"
      },
      {
        "id": 15626998,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "WDR82",
        "weight": "0.193148598864018"
      },
      {
        "id": 15630301,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "MFSD14B",
        "weight": "0.192993424020588"
      },
      {
        "id": 15634685,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "C6orf1",
        "weight": "0.192788015728243"
      },
      {
        "id": 15635892,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "CPQ",
        "weight": "0.192731429300522"
      },
      {
        "id": 15635897,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "MFSD13A",
        "weight": "0.192731171438153"
      },
      {
        "id": 15637241,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "SPNS1",
        "weight": "0.192671217461724"
      },
      {
        "id": 15638932,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "BPTF",
        "weight": "0.192594358256462"
      },
      {
        "id": 15639655,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "CDC123",
        "weight": "0.192561283729322"
      },
      {
        "id": 15642109,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "GTF3C1",
        "weight": "0.192447099609402"
      },
      {
        "id": 15644408,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "ACYP2",
        "weight": "0.192344810018651"
      },
      {
        "id": 15645029,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "RIN3",
        "weight": "0.192316999927751"
      },
      {
        "id": 15646131,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "ATP9A",
        "weight": "0.192265335376888"
      },
      {
        "id": 15646738,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "TUFM",
        "weight": "0.192238321963509"
      },
      {
        "id": 15647941,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "HEATR5B",
        "weight": "0.192183409726232"
      },
      {
        "id": 15648395,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CUTC",
        "weight": "0.19216290290051"
      },
      {
        "id": 15648997,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "SPNS1",
        "weight": "0.192136684432223"
      },
      {
        "id": 15649675,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "RPL29",
        "weight": "0.192106239884669"
      },
      {
        "id": 15650034,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "QPCT",
        "weight": "0.192090394286728"
      },
      {
        "id": 15650333,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "RPL6",
        "weight": "0.192077908828272"
      },
      {
        "id": 15650625,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CUTC",
        "weight": "0.192063600430908"
      },
      {
        "id": 15653389,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "TEX264",
        "weight": "0.191941587832265"
      },
      {
        "id": 15655583,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "EIF4A2",
        "weight": "0.191844024621429"
      },
      {
        "id": 15655709,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "RPL6",
        "weight": "0.191838616935301"
      },
      {
        "id": 15655763,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "BPTF",
        "weight": "0.191835768189439"
      },
      {
        "id": 15656045,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CACNB2",
        "gene": "RIN3",
        "weight": "0.191822753509319"
      },
      {
        "id": 15656194,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "CACNB2",
        "weight": "0.19181720911289"
      },
      {
        "id": 15657972,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CDC123",
        "weight": "0.191737059450763"
      },
      {
        "id": 15660665,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "NR1H3",
        "weight": "0.191616324618046"
      },
      {
        "id": 15662058,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "BDNF-AS",
        "weight": "0.191557556344477"
      },
      {
        "id": 15662224,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "MFSD13A",
        "weight": "0.191549662730178"
      },
      {
        "id": 15662405,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "MTRF1L",
        "weight": "0.191541913423721"
      },
      {
        "id": 15663652,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TUFM",
        "gene": "SPNS1",
        "weight": "0.191486809714739"
      },
      {
        "id": 15663738,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "FDPS",
        "weight": "0.191483608185048"
      },
      {
        "id": 15667009,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "SGF29",
        "weight": "0.191344357943003"
      },
      {
        "id": 15667211,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "HMOX2",
        "weight": "0.19133599226041"
      },
      {
        "id": 15667454,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "SYNGR1",
        "weight": "0.191324861994102"
      },
      {
        "id": 15667764,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "SYNGR1",
        "weight": "0.191311231699236"
      },
      {
        "id": 15668580,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "BDNF-AS",
        "weight": "0.19127406965669"
      },
      {
        "id": 15670516,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "TUFM",
        "weight": "0.191186716853363"
      },
      {
        "id": 15670783,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "TMEM116",
        "weight": "0.191175969816614"
      },
      {
        "id": 15673051,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "CUTC",
        "weight": "0.191076315537012"
      },
      {
        "id": 15673275,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "RIN3",
        "weight": "0.191065782208919"
      },
      {
        "id": 15674504,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "WIPI1",
        "weight": "0.191014736415691"
      },
      {
        "id": 15676380,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "RPL6",
        "weight": "0.190935197074459"
      },
      {
        "id": 15680233,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "CDC123",
        "weight": "0.190768029536108"
      },
      {
        "id": 15682614,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "TMEM67",
        "weight": "0.190670171110526"
      },
      {
        "id": 15682985,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "RIN3",
        "weight": "0.190656048297467"
      },
      {
        "id": 15683426,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPNS1",
        "gene": "ALDOA",
        "weight": "0.190635908436738"
      },
      {
        "id": 15685144,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "SYNGR1",
        "weight": "0.190560964092715"
      },
      {
        "id": 15686367,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ALDOA",
        "gene": "CLPTM1",
        "weight": "0.190509456483662"
      },
      {
        "id": 15692610,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "MFSD14B",
        "weight": "0.190241026892133"
      },
      {
        "id": 15693100,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "SCUBE3",
        "weight": "0.190219672875439"
      },
      {
        "id": 15693344,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CDC123",
        "weight": "0.190210069298839"
      },
      {
        "id": 15694522,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "BDNF-AS",
        "weight": "0.190159985171769"
      },
      {
        "id": 15694705,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "SCUBE3",
        "weight": "0.190151739233244"
      },
      {
        "id": 15694869,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "MFSD13A",
        "weight": "0.19014476425723"
      },
      {
        "id": 15695379,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "CDC123",
        "weight": "0.1901224489571"
      },
      {
        "id": 15699572,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "MFSD13A",
        "weight": "0.189944674066139"
      },
      {
        "id": 15702829,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "BDNF-AS",
        "weight": "0.189805723385004"
      },
      {
        "id": 15704882,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "INA",
        "weight": "0.189715628062299"
      },
      {
        "id": 15706637,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "SYNGR1",
        "weight": "0.189640660995962"
      },
      {
        "id": 15706815,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "RIN3",
        "weight": "0.189632811885655"
      },
      {
        "id": 15707879,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "PRKD3",
        "weight": "0.18958791880473"
      },
      {
        "id": 15708340,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "MFSD14B",
        "weight": "0.189569230600307"
      },
      {
        "id": 15708410,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "RPL6",
        "weight": "0.189566349488904"
      },
      {
        "id": 15709261,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "BDNF-AS",
        "weight": "0.189530672368846"
      },
      {
        "id": 15710983,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HACD1",
        "gene": "SPNS1",
        "weight": "0.18945761077084"
      },
      {
        "id": 15714490,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "C11orf49",
        "weight": "0.189312581510139"
      },
      {
        "id": 15715070,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "TMEM116",
        "weight": "0.18928840037615"
      },
      {
        "id": 15721817,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GTF3C1",
        "gene": "TMEM160",
        "weight": "0.189011225590278"
      },
      {
        "id": 15722323,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "BDNF-AS",
        "weight": "0.188989553068277"
      },
      {
        "id": 15727683,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "WIPI1",
        "weight": "0.188771888726155"
      },
      {
        "id": 15729435,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "TEX264",
        "weight": "0.188701151327273"
      },
      {
        "id": 15729916,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATF6B",
        "gene": "ALDOA",
        "weight": "0.18867895249076"
      },
      {
        "id": 15730148,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "ALDOA",
        "weight": "0.188669631511298"
      },
      {
        "id": 15730367,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "CALM3",
        "weight": "0.188661654504209"
      },
      {
        "id": 15731818,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "TMEM160",
        "weight": "0.188603689624697"
      },
      {
        "id": 15732595,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "C11orf49",
        "weight": "0.18857234423769"
      },
      {
        "id": 15734849,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "ATP9A",
        "weight": "0.1884810580428"
      },
      {
        "id": 15735409,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RIN3",
        "gene": "HMOX2",
        "weight": "0.188457549314443"
      },
      {
        "id": 15736687,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "TMEM116",
        "weight": "0.188407367880438"
      },
      {
        "id": 15739506,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "SCUBE3",
        "weight": "0.188295123169757"
      },
      {
        "id": 15741163,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "RPL29",
        "weight": "0.188227078675599"
      },
      {
        "id": 15748032,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "HEXB",
        "weight": "0.187949784218068"
      },
      {
        "id": 15751391,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "MTRF1L",
        "weight": "0.187815186730382"
      },
      {
        "id": 15752648,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "CDC123",
        "weight": "0.187766708781712"
      },
      {
        "id": 15752818,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "ALDOA",
        "weight": "0.187759900406907"
      },
      {
        "id": 15754922,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "ACYP2",
        "weight": "0.18767900307773"
      },
      {
        "id": 15755507,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "CCNH",
        "weight": "0.187655416346808"
      },
      {
        "id": 15756564,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "HMOX2",
        "weight": "0.187614184108804"
      },
      {
        "id": 15758830,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "SCUBE3",
        "weight": "0.187525350431351"
      },
      {
        "id": 15761389,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "SCUBE3",
        "weight": "0.187426637692506"
      },
      {
        "id": 15761971,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "BDNF-AS",
        "weight": "0.187402109134156"
      },
      {
        "id": 15765373,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "CLPTM1",
        "weight": "0.187271227416365"
      },
      {
        "id": 15765415,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "HACD1",
        "weight": "0.187269581076082"
      },
      {
        "id": 15765451,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "INA",
        "weight": "0.187268014977568"
      },
      {
        "id": 15767668,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "MFSD14B",
        "weight": "0.187180239112614"
      },
      {
        "id": 15770471,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "MFSD13A",
        "weight": "0.187075545947452"
      },
      {
        "id": 15771776,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "MFSD13A",
        "weight": "0.187027665036807"
      },
      {
        "id": 15772278,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "TMEM67",
        "weight": "0.187007574523276"
      },
      {
        "id": 15774101,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "MFSD14B",
        "weight": "0.186938107076543"
      },
      {
        "id": 15774143,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "ZNF76",
        "weight": "0.186936460597114"
      },
      {
        "id": 15775410,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "MFSD13A",
        "weight": "0.186889655519237"
      },
      {
        "id": 15779658,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "C6orf1",
        "weight": "0.186725716137068"
      },
      {
        "id": 15781202,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "HMOX2",
        "weight": "0.186668145295624"
      },
      {
        "id": 15781442,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "C1QTNF4",
        "weight": "0.186660099432274"
      },
      {
        "id": 15783775,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "RPL6",
        "weight": "0.186572111543887"
      },
      {
        "id": 15787520,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "NR1H3",
        "weight": "0.186428667672951"
      },
      {
        "id": 15789179,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "RPL6",
        "weight": "0.186364025626693"
      },
      {
        "id": 15796691,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "HMOX2",
        "weight": "0.18607857730395"
      },
      {
        "id": 15800174,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "RPL29",
        "weight": "0.185949059187366"
      },
      {
        "id": 15801564,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "ALDOA",
        "weight": "0.185897428202843"
      },
      {
        "id": 15805366,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "CLPTM1",
        "weight": "0.185751808966227"
      },
      {
        "id": 15806619,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "TUFM",
        "weight": "0.185702183272203"
      },
      {
        "id": 15806936,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "TMEM160",
        "weight": "0.185690137198082"
      },
      {
        "id": 15809115,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "MFSD14B",
        "weight": "0.185608739446402"
      },
      {
        "id": 15810602,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "TMEM9B",
        "weight": "0.185554631495891"
      },
      {
        "id": 15811664,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "MFSD13A",
        "weight": "0.185516748259515"
      },
      {
        "id": 15813022,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "MFSD14B",
        "weight": "0.185465585173052"
      },
      {
        "id": 15813743,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "SYNGR1",
        "weight": "0.185438919125938"
      },
      {
        "id": 15814355,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ALDOA",
        "gene": "WIPI1",
        "weight": "0.185415825201126"
      },
      {
        "id": 15816395,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "PRKD3",
        "weight": "0.185342650459543"
      },
      {
        "id": 15816396,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "HEXB",
        "weight": "0.185342585142657"
      },
      {
        "id": 15818408,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "SRSF7",
        "weight": "0.18527048976411"
      },
      {
        "id": 15821951,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "BPTF",
        "weight": "0.185138673363011"
      },
      {
        "id": 15822954,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "NFE2L1",
        "weight": "0.185102097436748"
      },
      {
        "id": 15823214,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "SCUBE3",
        "weight": "0.185091790750027"
      },
      {
        "id": 15823509,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "NR1H3",
        "weight": "0.185081000044247"
      },
      {
        "id": 15829536,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "ALDOA",
        "weight": "0.184859914725661"
      },
      {
        "id": 15829600,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "SCUBE3",
        "weight": "0.184857435961689"
      },
      {
        "id": 15831677,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ATP9A",
        "gene": "TMEM160",
        "weight": "0.184780050486192"
      },
      {
        "id": 15832120,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "INA",
        "gene": "BPTF",
        "weight": "0.184764333906925"
      },
      {
        "id": 15836114,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "RPL6",
        "weight": "0.184616988941728"
      },
      {
        "id": 15840635,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "ALDOA",
        "weight": "0.184451976099891"
      },
      {
        "id": 15841329,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "MFSD14B",
        "weight": "0.184425711870026"
      },
      {
        "id": 15847060,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "MFSD13A",
        "weight": "0.184220499143103"
      },
      {
        "id": 15849113,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "RPL27A",
        "weight": "0.184146139547275"
      },
      {
        "id": 15849302,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "MFSD14B",
        "weight": "0.18414068192604"
      },
      {
        "id": 15855069,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SMIM4",
        "weight": "0.183937636825413"
      },
      {
        "id": 15859855,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "MFSD13A",
        "weight": "0.183770240756735"
      },
      {
        "id": 15861191,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "MFSD13A",
        "weight": "0.18372222515322"
      },
      {
        "id": 15862036,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "ALDOA",
        "weight": "0.183693884094212"
      },
      {
        "id": 15862954,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "HMOX2",
        "weight": "0.183661572223875"
      },
      {
        "id": 15864154,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "MFSD13A",
        "weight": "0.183621446552814"
      },
      {
        "id": 15864896,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "HMOX2",
        "weight": "0.183595411292598"
      },
      {
        "id": 15866755,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "RPL27A",
        "weight": "0.183530953523015"
      },
      {
        "id": 15870550,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "HEXB",
        "weight": "0.183396826585718"
      },
      {
        "id": 15872540,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "RPL6",
        "weight": "0.183327061488034"
      },
      {
        "id": 15880146,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "RPL27A",
        "weight": "0.183064993122749"
      },
      {
        "id": 15882153,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "HMOX2",
        "weight": "0.18299527352279"
      },
      {
        "id": 15884069,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GTF3C1",
        "gene": "ATP9A",
        "weight": "0.182928606287184"
      },
      {
        "id": 15885923,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "SPCS1",
        "weight": "0.182864758610503"
      },
      {
        "id": 15885961,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "TUFM",
        "weight": "0.182863416018733"
      },
      {
        "id": 15888631,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "PRKD3",
        "weight": "0.182770201735497"
      },
      {
        "id": 15890379,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "HACD1",
        "weight": "0.182708949323948"
      },
      {
        "id": 15891872,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "ALDOA",
        "weight": "0.182658335545266"
      },
      {
        "id": 15892781,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "CCNH",
        "weight": "0.182628656930949"
      },
      {
        "id": 15892870,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "NR1H3",
        "weight": "0.182625366029309"
      },
      {
        "id": 15894691,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "RIN3",
        "weight": "0.182564526456763"
      },
      {
        "id": 15896164,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "C1QTNF4",
        "weight": "0.182514575378571"
      },
      {
        "id": 15900782,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "PRKD3",
        "weight": "0.182360887785406"
      },
      {
        "id": 15901216,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "RPL29",
        "weight": "0.182345382294822"
      },
      {
        "id": 15902866,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "ALDOA",
        "weight": "0.182289632710851"
      },
      {
        "id": 15905332,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "RPL6",
        "weight": "0.182207052383959"
      },
      {
        "id": 15911806,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "BTF3",
        "weight": "0.181989371219147"
      },
      {
        "id": 15912141,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "CPQ",
        "weight": "0.181978068699435"
      },
      {
        "id": 15912659,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "RPL6",
        "weight": "0.181960169031123"
      },
      {
        "id": 15912890,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "INA",
        "weight": "0.181952885635992"
      },
      {
        "id": 15913556,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "INA",
        "weight": "0.181930375660273"
      },
      {
        "id": 15922520,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "C1QTNF4",
        "weight": "0.181625660408008"
      },
      {
        "id": 15924110,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "MFSD14B",
        "weight": "0.181575085228269"
      },
      {
        "id": 15925718,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SCUBE3",
        "gene": "TUFM",
        "weight": "0.181519648584491"
      },
      {
        "id": 15930230,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "C11orf49",
        "weight": "0.181368132280073"
      },
      {
        "id": 15930769,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "TUFM",
        "weight": "0.181350287370858"
      },
      {
        "id": 15931199,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "BTF3",
        "weight": "0.181336705532595"
      },
      {
        "id": 15931969,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "SRSF7",
        "weight": "0.181312990156999"
      },
      {
        "id": 15933430,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "C1QTNF4",
        "weight": "0.181263972346085"
      },
      {
        "id": 15934263,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "SGF29",
        "weight": "0.181238088138016"
      },
      {
        "id": 15941424,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "TMEM9B",
        "weight": "0.181006697075921"
      },
      {
        "id": 15945802,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "WIPI1",
        "weight": "0.180866679670281"
      },
      {
        "id": 15946309,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "TMEM67",
        "weight": "0.180850670923584"
      },
      {
        "id": 15954768,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL29",
        "gene": "TMEM67",
        "weight": "0.180577588697165"
      },
      {
        "id": 15954799,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "INA",
        "weight": "0.18057675975121"
      },
      {
        "id": 15958744,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BPTF",
        "gene": "TMEM160",
        "weight": "0.180453045010875"
      },
      {
        "id": 15960683,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "CACNB2",
        "weight": "0.180389893520896"
      },
      {
        "id": 15960843,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "SPCS1",
        "weight": "0.18038486106237"
      },
      {
        "id": 15964138,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "MFSD13A",
        "weight": "0.180279099297926"
      },
      {
        "id": 15964633,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "CALM3",
        "weight": "0.180262802440408"
      },
      {
        "id": 15964737,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "TMEM160",
        "weight": "0.180259391792128"
      },
      {
        "id": 15966326,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "TUFM",
        "weight": "0.180207670950327"
      },
      {
        "id": 15968419,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "HACD1",
        "weight": "0.180139167948743"
      },
      {
        "id": 15975099,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD13A",
        "gene": "TUFM",
        "weight": "0.179928525877517"
      },
      {
        "id": 15975253,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NFE2L1",
        "gene": "BPTF",
        "weight": "0.179923608758855"
      },
      {
        "id": 15984968,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "HACD1",
        "weight": "0.179618641546404"
      },
      {
        "id": 15985233,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MFSD14B",
        "gene": "HACD1",
        "weight": "0.179610698913188"
      },
      {
        "id": 15985757,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "CUTC",
        "weight": "0.17959207382606"
      },
      {
        "id": 15991511,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "C11orf49",
        "weight": "0.179407927809042"
      },
      {
        "id": 16000028,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "HMOX2",
        "weight": "0.179147402735904"
      },
      {
        "id": 16000233,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "HMOX2",
        "weight": "0.179141040430508"
      },
      {
        "id": 16002297,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "TMEM9B",
        "weight": "0.179077442609937"
      },
      {
        "id": 16002397,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "TMEM160",
        "weight": "0.179074456611839"
      },
      {
        "id": 16006582,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "RIN3",
        "weight": "0.178948150549452"
      },
      {
        "id": 16008171,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HACD1",
        "gene": "MFSD13A",
        "weight": "0.178901157367887"
      },
      {
        "id": 16011760,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "SRSF7",
        "weight": "0.178794237589148"
      },
      {
        "id": 16015867,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "NFE2L1",
        "weight": "0.178668650843772"
      },
      {
        "id": 16028535,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "TMEM9B",
        "weight": "0.178285143703332"
      },
      {
        "id": 16033241,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "TMEM116",
        "weight": "0.178142250601119"
      },
      {
        "id": 16036418,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "CPQ",
        "weight": "0.178047366233712"
      },
      {
        "id": 16039430,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "ALDOA",
        "weight": "0.177956381463862"
      },
      {
        "id": 16042048,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "GTF3C1",
        "weight": "0.17787951753325"
      },
      {
        "id": 16042943,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "ALDOA",
        "weight": "0.17785360738683"
      },
      {
        "id": 16043228,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM116",
        "gene": "HMOX2",
        "weight": "0.177844870227856"
      },
      {
        "id": 16045251,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RIN3",
        "gene": "WIPI1",
        "weight": "0.177782454187636"
      },
      {
        "id": 16049011,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "BDNF-AS",
        "weight": "0.177669430911601"
      },
      {
        "id": 16049491,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "CCNH",
        "weight": "0.177656314700804"
      },
      {
        "id": 16052452,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SGF29",
        "weight": "0.177566873367376"
      },
      {
        "id": 16059756,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "TMEM9B",
        "weight": "0.177346276055339"
      },
      {
        "id": 16059956,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C1QTNF4",
        "gene": "CHGA",
        "weight": "0.177341084273446"
      },
      {
        "id": 16064808,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "BPTF",
        "weight": "0.177198450589366"
      },
      {
        "id": 16064954,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "RIN3",
        "weight": "0.177194192385729"
      },
      {
        "id": 16066826,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "RPL6",
        "weight": "0.177141414930298"
      },
      {
        "id": 16068842,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "RIN3",
        "weight": "0.17708227232182"
      },
      {
        "id": 16070903,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "HMOX2",
        "weight": "0.177021761310508"
      },
      {
        "id": 16072762,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "HMOX2",
        "weight": "0.176968118930988"
      },
      {
        "id": 16072912,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "CHGA",
        "weight": "0.176963454083267"
      },
      {
        "id": 16080010,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "RIN3",
        "weight": "0.176760183158267"
      },
      {
        "id": 16083519,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "TMEM160",
        "weight": "0.176659161057206"
      },
      {
        "id": 16087938,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "RIN3",
        "weight": "0.17653059239781"
      },
      {
        "id": 16090597,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "RPL27A",
        "weight": "0.176454152313058"
      },
      {
        "id": 16091182,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "C1QTNF4",
        "weight": "0.176438038335414"
      },
      {
        "id": 16101138,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM116",
        "gene": "RIN3",
        "weight": "0.176149299164552"
      },
      {
        "id": 16112608,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "TMEM116",
        "weight": "0.175823061696923"
      },
      {
        "id": 16113299,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "CCNH",
        "weight": "0.175803397023831"
      },
      {
        "id": 16113628,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "CLPTM1",
        "weight": "0.175793900673826"
      },
      {
        "id": 16115622,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "CPQ",
        "weight": "0.175739143018697"
      },
      {
        "id": 16119784,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "TMEM9B",
        "weight": "0.175621481197352"
      },
      {
        "id": 16120792,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "FEZ2",
        "weight": "0.175592725101521"
      },
      {
        "id": 16121039,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "CPQ",
        "weight": "0.17558636279318"
      },
      {
        "id": 16123261,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "ALDOA",
        "weight": "0.175525421893612"
      },
      {
        "id": 16123430,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "ALDOA",
        "weight": "0.17552000810317"
      },
      {
        "id": 16127171,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "CLPTM1",
        "weight": "0.175413948615286"
      },
      {
        "id": 16127851,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "BDNF-AS",
        "weight": "0.175394577720209"
      },
      {
        "id": 16132626,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "RPL6",
        "weight": "0.175263101310463"
      },
      {
        "id": 16132743,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "TMEM9B",
        "weight": "0.175260232246184"
      },
      {
        "id": 16133119,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "RPL6",
        "weight": "0.175249132205544"
      },
      {
        "id": 16134918,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TUFM",
        "gene": "CALM3",
        "weight": "0.175199836264022"
      },
      {
        "id": 16143399,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "ZNF76",
        "weight": "0.174965657631954"
      },
      {
        "id": 16144236,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "HMOX2",
        "weight": "0.174942395463649"
      },
      {
        "id": 16148337,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "NR1H3",
        "weight": "0.174829264614383"
      },
      {
        "id": 16152322,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "SGF29",
        "weight": "0.174717068335999"
      },
      {
        "id": 16153455,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "WIPI1",
        "weight": "0.174686182223327"
      },
      {
        "id": 16153796,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "ATP9A",
        "weight": "0.174677069876436"
      },
      {
        "id": 16153812,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "GTF3C1",
        "weight": "0.174676575949586"
      },
      {
        "id": 16156809,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "SGF29",
        "weight": "0.174594232788229"
      },
      {
        "id": 16158278,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "TMEM9B",
        "weight": "0.17455494327508"
      },
      {
        "id": 16164320,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "RIN3",
        "weight": "0.174390898243659"
      },
      {
        "id": 16168922,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "ACYP2",
        "weight": "0.174262487522518"
      },
      {
        "id": 16177948,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "LRP4",
        "weight": "0.174021303329444"
      },
      {
        "id": 16178802,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "HMOX2",
        "weight": "0.173998632586051"
      },
      {
        "id": 16194482,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GTF3C1",
        "gene": "NFE2L1",
        "weight": "0.173580378604202"
      },
      {
        "id": 16197871,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "ALDOA",
        "weight": "0.173490260453781"
      },
      {
        "id": 16201613,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "TUFM",
        "weight": "0.173389699713225"
      },
      {
        "id": 16202126,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "YY1AP1",
        "weight": "0.173376023522546"
      },
      {
        "id": 16205467,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "EIF4A2",
        "weight": "0.173287647098517"
      },
      {
        "id": 16207246,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "GTF3C1",
        "weight": "0.173241902481208"
      },
      {
        "id": 16208184,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "ZNF76",
        "weight": "0.173218394225158"
      },
      {
        "id": 16214811,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "HMOX2",
        "weight": "0.173046342106059"
      },
      {
        "id": 16220839,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "KBTBD4",
        "weight": "0.172893948244612"
      },
      {
        "id": 16220980,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "KBTBD4",
        "weight": "0.172890810553958"
      },
      {
        "id": 16223499,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "BDNF-AS",
        "weight": "0.172824650589744"
      },
      {
        "id": 16227751,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "HMOX2",
        "weight": "0.172713677828757"
      },
      {
        "id": 16236782,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM116",
        "gene": "RPL6",
        "weight": "0.172478831172619"
      },
      {
        "id": 16237090,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "C11orf49",
        "weight": "0.172470675638386"
      },
      {
        "id": 16237801,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "TMEM67",
        "weight": "0.17245299461806"
      },
      {
        "id": 16243429,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "WIPI1",
        "weight": "0.172306464685076"
      },
      {
        "id": 16247590,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "RPL6",
        "weight": "0.172198100264327"
      },
      {
        "id": 16248202,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "ZNF76",
        "weight": "0.172183386221227"
      },
      {
        "id": 16250989,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "HACD1",
        "weight": "0.1721126429192"
      },
      {
        "id": 16254350,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "CLPTM1",
        "weight": "0.172028287588784"
      },
      {
        "id": 16257964,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "HACD1",
        "weight": "0.171938072144441"
      },
      {
        "id": 16261748,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "CCNH",
        "weight": "0.171839889144874"
      },
      {
        "id": 16263910,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "CUTC",
        "weight": "0.171785742243544"
      },
      {
        "id": 16272621,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "GNL3",
        "weight": "0.171567770175318"
      },
      {
        "id": 16277754,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "C6orf1",
        "weight": "0.171440359912847"
      },
      {
        "id": 16281117,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "TMEM9B",
        "weight": "0.171359371322752"
      },
      {
        "id": 16281303,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "HACD1",
        "weight": "0.171354352424521"
      },
      {
        "id": 16282282,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "CHGA",
        "weight": "0.171331657808563"
      },
      {
        "id": 16289627,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "RIN3",
        "weight": "0.171145127271424"
      },
      {
        "id": 16290417,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "GTF3C1",
        "weight": "0.171125490953851"
      },
      {
        "id": 16299763,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "ALDOA",
        "weight": "0.170893261320151"
      },
      {
        "id": 16306949,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "HMOX2",
        "weight": "0.170716060934726"
      },
      {
        "id": 16309103,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "GTF3C1",
        "weight": "0.170662897935786"
      },
      {
        "id": 16322895,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "WIPI1",
        "weight": "0.170322647287215"
      },
      {
        "id": 16326521,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "CALM3",
        "weight": "0.170232661920427"
      },
      {
        "id": 16326673,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "EIF4A2",
        "weight": "0.170228793411296"
      },
      {
        "id": 16326731,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "ATP9A",
        "weight": "0.170227034726745"
      },
      {
        "id": 16327228,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "ATP9A",
        "weight": "0.170214276791871"
      },
      {
        "id": 16330247,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "BTF3",
        "weight": "0.170143358690099"
      },
      {
        "id": 16345907,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "BTF3",
        "weight": "0.169770885702298"
      },
      {
        "id": 16347568,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "BDNF-AS",
        "weight": "0.169729372899255"
      },
      {
        "id": 16348541,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "CALM3",
        "weight": "0.169706862087741"
      },
      {
        "id": 16349782,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "TMEM9B",
        "weight": "0.169677605590119"
      },
      {
        "id": 16353050,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "DNAJC27-AS1",
        "weight": "0.169599387187553"
      },
      {
        "id": 16355477,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "CDC123",
        "weight": "0.1695423969145"
      },
      {
        "id": 16359066,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "SPCS1",
        "weight": "0.16945839376613"
      },
      {
        "id": 16359562,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "TMEM9B",
        "weight": "0.169446289761829"
      },
      {
        "id": 16359900,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "TMEM116",
        "weight": "0.169437766640178"
      },
      {
        "id": 16360279,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "TMEM9B",
        "weight": "0.169428207274957"
      },
      {
        "id": 16365487,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "BDNF-AS",
        "weight": "0.169306803548254"
      },
      {
        "id": 16367002,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "BPTF",
        "weight": "0.169272153835538"
      },
      {
        "id": 16374153,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "WIPI1",
        "weight": "0.16910684685917"
      },
      {
        "id": 16381413,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "ALDOA",
        "weight": "0.168936867616883"
      },
      {
        "id": 16388179,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "SPCS1",
        "weight": "0.168780636529756"
      },
      {
        "id": 16390424,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "HEATR5B",
        "weight": "0.168727990482351"
      },
      {
        "id": 16391440,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "HEXB",
        "weight": "0.168705015061051"
      },
      {
        "id": 16392190,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "HEXB",
        "weight": "0.168687852160792"
      },
      {
        "id": 16392780,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "SPCS1",
        "weight": "0.168674706232641"
      },
      {
        "id": 16395023,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NFE2L1",
        "gene": "ATP9A",
        "weight": "0.168623007913584"
      },
      {
        "id": 16401872,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "MTRF1L",
        "weight": "0.168463018939711"
      },
      {
        "id": 16413936,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "BTF3",
        "weight": "0.168183738471002"
      },
      {
        "id": 16417043,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "HMOX2",
        "weight": "0.16811193072367"
      },
      {
        "id": 16418204,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "CACNB2",
        "weight": "0.168085434588606"
      },
      {
        "id": 16424008,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "CALM3",
        "weight": "0.167952621179179"
      },
      {
        "id": 16424624,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "CACNB2",
        "weight": "0.1679391691588"
      },
      {
        "id": 16429497,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "CLPTM1",
        "weight": "0.167828578335508"
      },
      {
        "id": 16429893,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "MTRF1L",
        "weight": "0.167819585726028"
      },
      {
        "id": 16431828,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "RPL6",
        "weight": "0.16777653100012"
      },
      {
        "id": 16433466,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "CCNH",
        "weight": "0.167740864308193"
      },
      {
        "id": 16435055,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "CUTC",
        "weight": "0.167704874088275"
      },
      {
        "id": 16442389,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "KBTBD4",
        "weight": "0.167541750184226"
      },
      {
        "id": 16451023,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "RPL6",
        "weight": "0.167350108179107"
      },
      {
        "id": 16451671,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "HEXB",
        "weight": "0.167335612951892"
      },
      {
        "id": 16459275,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CACNB2",
        "gene": "HMOX2",
        "weight": "0.16716416976418"
      },
      {
        "id": 16461072,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "CDC123",
        "weight": "0.167125435591444"
      },
      {
        "id": 16464081,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "RPL6",
        "weight": "0.167057791487991"
      },
      {
        "id": 16469665,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "SSR2",
        "weight": "0.166935506037104"
      },
      {
        "id": 16471107,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "CPQ",
        "weight": "0.16690341786989"
      },
      {
        "id": 16472280,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "RPL27A",
        "weight": "0.166876824293136"
      },
      {
        "id": 16474227,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "CHGA",
        "weight": "0.166836061125353"
      },
      {
        "id": 16478637,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "BDNF-AS",
        "weight": "0.166740371817945"
      },
      {
        "id": 16482090,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "ATP9A",
        "weight": "0.166667309693861"
      },
      {
        "id": 16484038,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "TMEM9B",
        "weight": "0.166623800707554"
      },
      {
        "id": 16489890,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "BDNF-AS",
        "weight": "0.166496420875696"
      },
      {
        "id": 16494165,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "ATP9A",
        "weight": "0.166403937903065"
      },
      {
        "id": 16495894,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "CPQ",
        "weight": "0.166365674764881"
      },
      {
        "id": 16498673,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "LMNA",
        "weight": "0.166303957296521"
      },
      {
        "id": 16502277,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "C6orf1",
        "weight": "0.166225812563906"
      },
      {
        "id": 16507729,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "CCNH",
        "weight": "0.166110642286828"
      },
      {
        "id": 16509803,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "FEZ2",
        "weight": "0.166066444083965"
      },
      {
        "id": 16512515,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "WIPI1",
        "weight": "0.166006745383468"
      },
      {
        "id": 16518613,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RIN3",
        "gene": "SGF29",
        "weight": "0.165879501580912"
      },
      {
        "id": 16524579,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BDNF-AS",
        "gene": "CALM3",
        "weight": "0.165753414106069"
      },
      {
        "id": 16535516,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "QPCT",
        "weight": "0.165523321682853"
      },
      {
        "id": 16536017,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LRP4",
        "gene": "CALM3",
        "weight": "0.165512994529599"
      },
      {
        "id": 16539050,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "CCNH",
        "weight": "0.165448738858969"
      },
      {
        "id": 16539926,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "TEX264",
        "weight": "0.165430284238838"
      },
      {
        "id": 16539987,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "CACNB2",
        "weight": "0.165429360816068"
      },
      {
        "id": 16540707,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "NR1H3",
        "weight": "0.165413298872724"
      },
      {
        "id": 16540996,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "NR1H3",
        "weight": "0.16540705817221"
      },
      {
        "id": 16542389,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "GTF3C1",
        "weight": "0.165377272981031"
      },
      {
        "id": 16544624,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "SGF29",
        "weight": "0.165328557599269"
      },
      {
        "id": 16572765,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "WIPI1",
        "weight": "0.164746337114438"
      },
      {
        "id": 16573137,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "TMEM9B",
        "weight": "0.164738776231881"
      },
      {
        "id": 16579587,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HMOX2",
        "gene": "SGF29",
        "weight": "0.164605372543983"
      },
      {
        "id": 16593277,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "RIN3",
        "weight": "0.164323092721006"
      },
      {
        "id": 16596040,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "CALM3",
        "weight": "0.164265978738011"
      },
      {
        "id": 16598758,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "CLPTM1",
        "weight": "0.164213389178944"
      },
      {
        "id": 16599584,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "NDUFAF7",
        "weight": "0.16419760083663"
      },
      {
        "id": 16614207,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "TUFM",
        "weight": "0.163895515848029"
      },
      {
        "id": 16615762,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "ALDOA",
        "weight": "0.16386358781199"
      },
      {
        "id": 16617188,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "CCNH",
        "weight": "0.163834755507461"
      },
      {
        "id": 16620713,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "CUTC",
        "weight": "0.163762552831462"
      },
      {
        "id": 16628673,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "CACNB2",
        "weight": "0.163603277453838"
      },
      {
        "id": 16647267,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "C6orf1",
        "weight": "0.163225775445553"
      },
      {
        "id": 16653005,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "C11orf49",
        "weight": "0.163109967485285"
      },
      {
        "id": 16660428,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "CCNH",
        "weight": "0.16296254740867"
      },
      {
        "id": 16660684,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "TMEM116",
        "weight": "0.162956899698027"
      },
      {
        "id": 16663541,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "KBTBD4",
        "weight": "0.162900658837173"
      },
      {
        "id": 16680181,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "SGF29",
        "weight": "0.162570969825219"
      },
      {
        "id": 16681775,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "RIN3",
        "weight": "0.162540297578654"
      },
      {
        "id": 16690128,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "CALM3",
        "weight": "0.16238001951111"
      },
      {
        "id": 16693871,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "CLPTM1",
        "weight": "0.162306515756539"
      },
      {
        "id": 16701378,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "RPL6",
        "weight": "0.162161275260231"
      },
      {
        "id": 16706425,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "CPQ",
        "weight": "0.162062582480003"
      },
      {
        "id": 16718766,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "HACD1",
        "weight": "0.161824017582266"
      },
      {
        "id": 16719507,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "HMOX2",
        "weight": "0.161810028937777"
      },
      {
        "id": 16730429,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "CLPTM1",
        "weight": "0.161605194058508"
      },
      {
        "id": 16742584,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "EIF4A2",
        "weight": "0.161375313596617"
      },
      {
        "id": 16744550,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "HMOX2",
        "weight": "0.161339063839783"
      },
      {
        "id": 16745073,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "CUTC",
        "weight": "0.161329108897462"
      },
      {
        "id": 16748880,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "CPQ",
        "weight": "0.161256582816637"
      },
      {
        "id": 16752373,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL6",
        "gene": "SGF29",
        "weight": "0.161191334095386"
      },
      {
        "id": 16752660,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "TUFM",
        "weight": "0.161186166651351"
      },
      {
        "id": 16757318,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM116",
        "gene": "WIPI1",
        "weight": "0.161099675560795"
      },
      {
        "id": 16761796,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "CHGA",
        "weight": "0.161015025850562"
      },
      {
        "id": 16762901,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "NR1H3",
        "weight": "0.16099401691492"
      },
      {
        "id": 16770550,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM116",
        "gene": "ALDOA",
        "weight": "0.160851197484368"
      },
      {
        "id": 16773332,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "ZNF76",
        "weight": "0.160799492295355"
      },
      {
        "id": 16773956,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "C11orf49",
        "weight": "0.160787636419868"
      },
      {
        "id": 16778149,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "WIPI1",
        "weight": "0.160706725903405"
      },
      {
        "id": 16781503,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "RPL27A",
        "weight": "0.160644828515531"
      },
      {
        "id": 16785493,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "CCNH",
        "weight": "0.160571801328476"
      },
      {
        "id": 16785978,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "SSR2",
        "weight": "0.160561549437065"
      },
      {
        "id": 16788671,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "ATP9A",
        "weight": "0.160512516467339"
      },
      {
        "id": 16792311,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CACNB2",
        "gene": "RPL6",
        "weight": "0.160444543545063"
      },
      {
        "id": 16794840,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "RIN3",
        "weight": "0.16039865578417"
      },
      {
        "id": 16807352,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "CALM3",
        "weight": "0.160170429478184"
      },
      {
        "id": 16810106,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "CPQ",
        "weight": "0.160118119626624"
      },
      {
        "id": 16811707,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "EIF4A2",
        "weight": "0.160088580383039"
      },
      {
        "id": 16812612,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CHGA",
        "gene": "BPTF",
        "weight": "0.160072120443055"
      },
      {
        "id": 16817211,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HACD1",
        "gene": "HMOX2",
        "weight": "0.159987370376651"
      },
      {
        "id": 16823419,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SMIM4",
        "weight": "0.159874602900507"
      },
      {
        "id": 16824907,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "RPL27A",
        "weight": "0.159848198124909"
      },
      {
        "id": 16831946,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "HMOX2",
        "weight": "0.159722949052856"
      },
      {
        "id": 16832457,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RUSC1",
        "gene": "NFE2L1",
        "weight": "0.159714015146453"
      },
      {
        "id": 16834375,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "CDC123",
        "weight": "0.159678773146272"
      },
      {
        "id": 16834570,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "EIF4A2",
        "weight": "0.159675383448973"
      },
      {
        "id": 16837410,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "CCNH",
        "weight": "0.15962355664533"
      },
      {
        "id": 16838563,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "RIN3",
        "weight": "0.159602593129562"
      },
      {
        "id": 16846339,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "QPCT",
        "weight": "0.159460795610707"
      },
      {
        "id": 16853276,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "CHGA",
        "weight": "0.159336293895133"
      },
      {
        "id": 16855153,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "KBTBD4",
        "weight": "0.159303406339873"
      },
      {
        "id": 16856395,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "BTF3",
        "weight": "0.159280954737773"
      },
      {
        "id": 16857519,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "SPCS1",
        "weight": "0.15926103221247"
      },
      {
        "id": 16858198,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "MEF2D",
        "weight": "0.159248830906241"
      },
      {
        "id": 16858246,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "C6orf1",
        "weight": "0.159248087352336"
      },
      {
        "id": 16858705,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "TMEM116",
        "weight": "0.159240157902802"
      },
      {
        "id": 16860805,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "NFE2L1",
        "weight": "0.159202647190172"
      },
      {
        "id": 16863332,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BAP1",
        "gene": "NFE2L1",
        "weight": "0.159158394139573"
      },
      {
        "id": 16877042,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RIN3",
        "gene": "CLPTM1",
        "weight": "0.158918995790166"
      },
      {
        "id": 16877806,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "KBTBD4",
        "weight": "0.158904818441233"
      },
      {
        "id": 16878329,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "WIPI1",
        "weight": "0.158896202149757"
      },
      {
        "id": 16878819,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "NR1H3",
        "weight": "0.158887894717202"
      },
      {
        "id": 16884323,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "SPNS1",
        "weight": "0.158793960336015"
      },
      {
        "id": 16884355,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "TUFM",
        "weight": "0.158793346614257"
      },
      {
        "id": 16887978,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "WIPI1",
        "gene": "CLPTM1",
        "weight": "0.158729735992903"
      },
      {
        "id": 16888432,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "KBTBD4",
        "gene": "RIN3",
        "weight": "0.158721813664765"
      },
      {
        "id": 16890629,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "ALDOA",
        "weight": "0.158682377940409"
      },
      {
        "id": 16891642,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ITSN2",
        "gene": "NFE2L1",
        "weight": "0.158664346569573"
      },
      {
        "id": 16894167,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "RPL27A",
        "weight": "0.158621433780472"
      },
      {
        "id": 16895746,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "RIN3",
        "weight": "0.1585936595489"
      },
      {
        "id": 16897829,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "WIPI1",
        "weight": "0.158557911326152"
      },
      {
        "id": 16899731,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "CDC123",
        "weight": "0.158524790637036"
      },
      {
        "id": 16901772,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "ITSN2",
        "weight": "0.158489052965374"
      },
      {
        "id": 16903974,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "ALDOA",
        "weight": "0.15845012465972"
      },
      {
        "id": 16911582,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "TMEM67",
        "weight": "0.158316907635751"
      },
      {
        "id": 16919608,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SRSF7",
        "gene": "CALM3",
        "weight": "0.158180712382165"
      },
      {
        "id": 16923780,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "TUFM",
        "weight": "0.158109190292946"
      },
      {
        "id": 16926218,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "TMEM9B",
        "weight": "0.158067309071903"
      },
      {
        "id": 16947299,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "RIN3",
        "weight": "0.157701703137755"
      },
      {
        "id": 16952045,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SGF29",
        "weight": "0.157620883269443"
      },
      {
        "id": 16954845,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "CPQ",
        "weight": "0.157574140689631"
      },
      {
        "id": 16955926,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "HMOX2",
        "weight": "0.157555458727855"
      },
      {
        "id": 16967452,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "RIN3",
        "weight": "0.157357981274224"
      },
      {
        "id": 16968574,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HACD1",
        "gene": "RPL6",
        "weight": "0.157339905326877"
      },
      {
        "id": 16968788,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "RPL6",
        "weight": "0.157336375039904"
      },
      {
        "id": 16970174,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RIN3",
        "gene": "ALDOA",
        "weight": "0.157312076641994"
      },
      {
        "id": 16970569,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "HEATR5B",
        "weight": "0.157305168070743"
      },
      {
        "id": 16972273,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "RIN3",
        "weight": "0.157277273472688"
      },
      {
        "id": 16980329,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "CPQ",
        "weight": "0.15714193488515"
      },
      {
        "id": 16982930,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GBA",
        "gene": "TUFM",
        "weight": "0.157099661438427"
      },
      {
        "id": 16991644,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CUTC",
        "gene": "WIPI1",
        "weight": "0.156953554233215"
      },
      {
        "id": 16995605,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "CUTC",
        "weight": "0.156888535151881"
      },
      {
        "id": 17008615,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "CPQ",
        "weight": "0.156672456511794"
      },
      {
        "id": 17009992,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "NFE2L1",
        "weight": "0.156649821259998"
      },
      {
        "id": 17014761,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "KBTBD4",
        "weight": "0.156570796779279"
      },
      {
        "id": 17020552,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ACYP2",
        "gene": "RPL6",
        "weight": "0.156473063894504"
      },
      {
        "id": 17023072,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HACD1",
        "gene": "ALDOA",
        "weight": "0.156430803682532"
      },
      {
        "id": 17023393,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "RIN3",
        "weight": "0.156425490224667"
      },
      {
        "id": 17025640,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "WIPI1",
        "weight": "0.15638759016056"
      },
      {
        "id": 17028193,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CCNH",
        "gene": "HACD1",
        "weight": "0.156346217355463"
      },
      {
        "id": 17031466,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "GNL3",
        "weight": "0.156290516682079"
      },
      {
        "id": 17055679,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLK2",
        "gene": "BAP1",
        "weight": "0.155892988038576"
      },
      {
        "id": 17057285,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "CCNH",
        "weight": "0.155866732082049"
      },
      {
        "id": 17062085,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "RIN3",
        "weight": "0.155787661060414"
      },
      {
        "id": 17062372,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPCS1",
        "gene": "TMEM67",
        "weight": "0.155783035781125"
      },
      {
        "id": 17070858,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "WIPI1",
        "weight": "0.15564674809779"
      },
      {
        "id": 17071332,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "RPL6",
        "weight": "0.155639263725729"
      },
      {
        "id": 17086279,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CACNB2",
        "gene": "WIPI1",
        "weight": "0.155400033190133"
      },
      {
        "id": 17106286,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "ALDOA",
        "weight": "0.155081721143075"
      },
      {
        "id": 17106530,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "BTF3",
        "gene": "TMEM67",
        "weight": "0.155077844342244"
      },
      {
        "id": 17107349,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "TEX264",
        "weight": "0.155065018033571"
      },
      {
        "id": 17112629,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "GNL3",
        "weight": "0.154981443340174"
      },
      {
        "id": 17130007,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "QPCT",
        "weight": "0.154709705385271"
      },
      {
        "id": 17134354,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "WIPI1",
        "weight": "0.154642800674592"
      },
      {
        "id": 17136448,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "CPQ",
        "weight": "0.154610145556001"
      },
      {
        "id": 17139972,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "TUFM",
        "weight": "0.154554342849297"
      },
      {
        "id": 17140544,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "SMIM4",
        "weight": "0.154544878470836"
      },
      {
        "id": 17145071,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SSR2",
        "gene": "RIN3",
        "weight": "0.154474042143163"
      },
      {
        "id": 17150880,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "TUFM",
        "weight": "0.154383840345988"
      },
      {
        "id": 17156714,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "WIPI1",
        "weight": "0.154293163688267"
      },
      {
        "id": 17158064,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "RPL6",
        "weight": "0.154272429603459"
      },
      {
        "id": 17177961,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "HMOX2",
        "weight": "0.153966971093289"
      },
      {
        "id": 17182424,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NR1H3",
        "gene": "WIPI1",
        "weight": "0.153897658934376"
      },
      {
        "id": 17183792,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "ATF6B",
        "weight": "0.153877010691477"
      },
      {
        "id": 17195944,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "WIPI1",
        "weight": "0.153691692555048"
      },
      {
        "id": 17200127,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "MTRF1L",
        "weight": "0.153627666469043"
      },
      {
        "id": 17212285,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "ACYP2",
        "weight": "0.153443227200016"
      },
      {
        "id": 17218853,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "CPQ",
        "weight": "0.153343038880726"
      },
      {
        "id": 17224520,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C6orf1",
        "gene": "RPL27A",
        "weight": "0.153257706455561"
      },
      {
        "id": 17226555,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "RPL27A",
        "weight": "0.153226900237671"
      },
      {
        "id": 17237014,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "DNAJC27-AS1",
        "gene": "CPQ",
        "weight": "0.153069773732434"
      },
      {
        "id": 17240809,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "CDC123",
        "weight": "0.153012095437041"
      },
      {
        "id": 17247876,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SMIM4",
        "gene": "TMEM9B",
        "weight": "0.152905099281569"
      },
      {
        "id": 17252720,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEATR5B",
        "gene": "ALDOA",
        "weight": "0.15283192701035"
      },
      {
        "id": 17254234,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "CDC123",
        "weight": "0.152809494928657"
      },
      {
        "id": 17262810,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "QPCT",
        "gene": "RPL27A",
        "weight": "0.152684433414498"
      },
      {
        "id": 17263968,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "CALM3",
        "weight": "0.152667552890874"
      },
      {
        "id": 17272334,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "WIPI1",
        "weight": "0.152541557887074"
      },
      {
        "id": 17274393,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "CPQ",
        "weight": "0.152511931889143"
      },
      {
        "id": 17276677,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CLPTM1",
        "gene": "CALM3",
        "weight": "0.152477904205178"
      },
      {
        "id": 17286964,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TUFM",
        "gene": "CLPTM1",
        "weight": "0.152325867686798"
      },
      {
        "id": 17287417,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CDC123",
        "gene": "WIPI1",
        "weight": "0.152318974177001"
      },
      {
        "id": 17289679,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "NR1H3",
        "weight": "0.15228538277404"
      },
      {
        "id": 17296848,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "PRKD3",
        "gene": "EIF4A2",
        "weight": "0.152180194119381"
      },
      {
        "id": 17309161,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "TEX264",
        "weight": "0.152002039580464"
      },
      {
        "id": 17315975,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "WIPI1",
        "weight": "0.151902593029547"
      },
      {
        "id": 17322352,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "YY1AP1",
        "gene": "SSR2",
        "weight": "0.151811262197802"
      },
      {
        "id": 17322697,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "TUFM",
        "weight": "0.151806454487358"
      },
      {
        "id": 17324714,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TEX264",
        "gene": "RIN3",
        "weight": "0.15177703527629"
      },
      {
        "id": 17331620,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FEZ2",
        "gene": "C11orf49",
        "weight": "0.151676954180552"
      },
      {
        "id": 17336023,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "LMNA",
        "gene": "CPQ",
        "weight": "0.151613354181492"
      },
      {
        "id": 17336887,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SPNS1",
        "gene": "CALM3",
        "weight": "0.151601455347938"
      },
      {
        "id": 17338370,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "CALM3",
        "weight": "0.151579016127282"
      },
      {
        "id": 17344250,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "EIF4A2",
        "gene": "SCUBE3",
        "weight": "0.151493021568802"
      },
      {
        "id": 17346306,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "GNL3",
        "gene": "EIF4A2",
        "weight": "0.151465679405119"
      },
      {
        "id": 17352198,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM67",
        "gene": "HMOX2",
        "weight": "0.151383443098916"
      },
      {
        "id": 17367624,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "RPL27A",
        "weight": "0.151164177669522"
      },
      {
        "id": 17377488,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "RPL27A",
        "gene": "CLPTM1",
        "weight": "0.151023821157837"
      },
      {
        "id": 17378332,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TUFM",
        "gene": "WIPI1",
        "weight": "0.151011799587249"
      },
      {
        "id": 17380183,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MTRF1L",
        "gene": "C11orf49",
        "weight": "0.150987212832297"
      },
      {
        "id": 17383870,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "MEF2D",
        "gene": "BAP1",
        "weight": "0.150936068439031"
      },
      {
        "id": 17386137,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "NDUFAF7",
        "gene": "RIN3",
        "weight": "0.150904990405976"
      },
      {
        "id": 17387343,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "FDPS",
        "gene": "ZNF76",
        "weight": "0.150888480835115"
      },
      {
        "id": 17395305,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "CPQ",
        "gene": "HACD1",
        "weight": "0.150777829892761"
      },
      {
        "id": 17407228,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "ZNF76",
        "gene": "CACNB2",
        "weight": "0.150611129368247"
      },
      {
        "id": 17408646,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "HEXB",
        "gene": "ALDOA",
        "weight": "0.150591114158313"
      },
      {
        "id": 17408826,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "TMEM9B",
        "gene": "SGF29",
        "weight": "0.150588789442596"
      },
      {
        "id": 17410458,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "C11orf49",
        "gene": "CACNB2",
        "weight": "0.150565332905044"
      },
      {
        "id": 17415854,
        "tissue": "Cerebral_Cortex",
        "celltype": "Excitatory_Neuron",
        "source": "SGF29",
        "gene": "ALDOA",
        "weight": "0.15048877963476"
      }
    ];
      // setLoading(false);
      // setCoexpression(res.data);
      // setTotal(res.meta.total);
      // console.log(res.data);
      let nodes = [];
      let edges = [];
      for(let i=0;i<400;i++){
        let a = {from:res[i].source,to:res[i].gene,weight: 10*res[i].weight};
        edges.push(a);
        let b = {color:'blue',marker: {radius: 7}, id: res[i].source}
        let c = {color:'blue',marker: {radius: 7}, id: res[i].gene}
        nodes.push(b);
        nodes.push(c);
      }
      const unique_nodes = uniqueArray(nodes,'id');
      console.log(unique_nodes);
      console.log(edges);
      setData(edges);
      setNodes(unique_nodes);
      setNetwork({nodes:unique_nodes,data:edges});
  }, []);
  const [userinputtissue, setUserinputtissue] = useState('Cerebral_Cortex');
  const [userinputcelltype, setUserinputcelltype] = useState('Excitatory_Neuron');
  const [userinputgene, setUserinputgene] = useState('ATF6B,LRP4,SPNS1,SCUBE3,MFSD14B,PRKD3,MFSD13A,GBA,SRSF7,RPL29,CPQ,BDNF-AS,YY1AP1,RIN3,CCNH,HMOX2,FEZ2,WIPI1,BTF3,C11orf49,SPCS1,FDPS,RPL6,MTRF1L,HEATR5B,TMEM116,CACNB2,TMEM9B,ZNF76,CUTC,SMIM4,SYT11,MADD,RANGAP1,WDR82,CLPTM1,SYNGR1,NR1H3,SGF29,C1QTNF4,INA,KBTBD4,GNL3,ALDOA,ACYP2,TMEM160,GTF3C1,CDC123,QPCT,BPTF,SSR2,ATP9A,NFE2L1,TEX264,TMEM67,C6orf1,EIF4A2,DNAJC27-AS1,RPL27A,HEXB,CLK2,CALM3,LMNA,NDUFAF7,TUFM,BAP1,CHGA,HACD1,ITSN2,RUSC1,MEF2D');
  const [userinputgene2, setUserinputgene2] = useState('AR,ARID1A,ARID1B,ARID2,ARID4B,ASF1A,ASH2L,ATXN1L,BCL11A,BCL7A,BCL7C,BCL9,BCOR,BMPER,BPTF,BRD2,BRD3,BRMS1L,C19orf71,C7orf61,CBX3,CBX5,CCDC144NL,CDK8,CENPA,CHAF1A,CHD7,CIC,CREBBP,CSNK2A1,DLGAP1-AS2,DPF1,DPT,E2F6,EHMT1,EHMT2,ELF1,ELF2,ELF4,ELK3,EN1,EP300,EP400,ERG,ETS1,EZH2,FAT2,FEV,FHL2,FOXI1,FOXK1,FOXK2,FOXP1,FSTL5,GATA2,GATA3,GATAD1,GATAD2A,GATAD2B,GCM1,GSE1,H2AZ1,H2BC21,H2BC8,H3-4,H3C1,H4C1,HDAC1,HDAC2,HDAC3,HERC2P3,HHAT,HIVEP1,HMG20A,HMGXB4,HNF1B,HNF4A,IQCJ-SCHIP1,IRF4,JUN,KAT14,KAT2B,KAT5,KCNQ1OT1,KDM1A,KDM2B,KDM6A,KLF3,KLF5,KLF8,KMT2A,KMT2C,KMT2D,KRTAP9-9,L3MBTL2,LDB1,LHX2,LHX3,LHX4,LIN37,LIN9,MAP6D1,MBD2,MBD3,MBIP,MCRS1,MED4,MGA,MTA1,MTA2,MTA3,MYB,MYOD1,NCOA3,NCOR1,NCOR2,NFIA,NFIB,NFIC,NFIX,NKAPP1,NKX6-2,NR2C1,PARP1,PAX2,PAX6,PAX7,PAX8,PAX9,PBRM1,PCGF1,PHF1,PHF12,POGZ,POLR1G,RB1,RBBP4,RBBP5,RBBP7,RBPJ,RCOR1,RERE,RNU6-6P,RNU6-8,RPL23AP42,SAP130,SAP30,SATB2,SIN3A,SIN3B,SLC24A2,SMARCA2,SMARCA4,SMARCB1,SMARCC1,SMARCC2,SMARCD1,SMARCD2,SMARCD3,SMARCE1,SMG7,SOX10,SOX17,SOX21-AS1,SOX5,SOX6,SOX9,SP7,SS18L1,SSBP3,ST18,SUDS3,SUZ12,TADA2A,TAF6,TBL1X,TBR1,TBXT,TEAD1,TERF2IP,TFIP11,TLE1,TLE5,TLX1,TLX3,TMEM163,TP53BP1,TRPS1,TRRAP,UBE2I,WIZ,YY1,ZNF330,ZNF608,ZNF609,ZNF644,ZNF676,ZZZ3')
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
        let nodes = [];
        let edges = [];
        for(let i=0;i<res.data.length;i++){
          let a = {from:res.data[i].source,to:res.data[i].gene};
          edges.push(a);
          let b = {color:'blue',marker: {radius: 7}, id: res.data[i].source}
          let c = {color:'blue',marker: {radius: 7}, id: res.data[i].gene}
          nodes.push(b);
          nodes.push(c);
        }
        const unique_nodes = uniqueArray(nodes,'id');
        console.log(unique_nodes);
        console.log(edges);
        setData(edges);
        setNodes(unique_nodes);
        setNetwork({nodes:unique_nodes,data:edges});
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
      <Row justify={'center'}>
        <Col md={8}>
          <Row>
            <Col>
              <Title level={3}>
                1.Tissue
              </Title>
              <Select
                style={{ width: '100%' }}
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
          </Row>
          <Row>
            <Col >
              <Title level={3}>
                2.Cell Type
              </Title>
              <Select
                style={{ width: '100%' }}
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
          </Row>
          <Row>
            <Col>
              <Title level={3}>
                3.Gene Set
              </Title>
              <TextArea
                placeholder="input a collection of gene symbols separated by commas"
                allowClear={true}
                value={userinputgene}
                maxLength={1000}
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
              <Text
                style={{ color: '#4D96FF' }}
                onClick={() => {
                  setUserinputgene('ATF6B,LRP4,SPNS1,SCUBE3,MFSD14B,PRKD3,MFSD13A,GBA,SRSF7,RPL29,CPQ,BDNF-AS,YY1AP1,RIN3,CCNH,HMOX2,FEZ2,WIPI1,BTF3,C11orf49,SPCS1,FDPS,RPL6,MTRF1L,HEATR5B,TMEM116,CACNB2,TMEM9B,ZNF76,CUTC,SMIM4,SYT11,MADD,RANGAP1,WDR82,CLPTM1,SYNGR1,NR1H3,SGF29,C1QTNF4,INA,KBTBD4,GNL3,ALDOA,ACYP2,TMEM160,GTF3C1,CDC123,QPCT,BPTF,SSR2,ATP9A,NFE2L1,TEX264,TMEM67,C6orf1,EIF4A2,DNAJC27-AS1,RPL27A,HEXB,CLK2,CALM3,LMNA,NDUFAF7,TUFM,BAP1,CHGA,HACD1,ITSN2,RUSC1,MEF2D');
                }}
              >
                e.g. ATF6B,LRP4,SPNS1,SCUBE3,MFSD14B,PRKD3,MFSD13A,GBA,SRSF7,RPL29,CPQ,BDNF-AS,YY1AP1,RIN3,CCNH,HMOX2,FEZ2,WIPI1,BTF3,C11orf49,SPCS1,FDPS,RPL6,MTRF1L,HEATR5B,TMEM116,CACNB2,TMEM9B,ZNF76,CUTC,SMIM4,SYT11,MADD,RANGAP1,WDR82,CLPTM1,SYNGR1,NR1H3,SGF29,C1QTNF4,INA,KBTBD4,GNL3,ALDOA,ACYP2,TMEM160,GTF3C1,CDC123,QPCT,BPTF,SSR2,ATP9A,NFE2L1,TEX264,TMEM67,C6orf1,EIF4A2,DNAJC27-AS1,RPL27A,HEXB,CLK2,CALM3,LMNA,NDUFAF7,TUFM,BAP1,CHGA,HACD1,ITSN2,RUSC1,MEF2D
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Title level={3}>
                4.
                <Button type="primary" onClick={onSubmit}>
                  Submit Job
                </Button>
              </Title>
            </Col>
          </Row>
        </Col>
        <Col md={14} style={{marginLeft:"1%"}}>
          <Title level={3}>
            Results:
          </Title>
          <Network network={network} />
        </Col>
      </Row>
      <Divider />
      <Title level={2}>
        Cell-Type Enrichment Analysis
      </Title>
      <Row justify={'center'}>
        <Col md={8}>
          <Row>
            <Title level={3}>
              1. Input Gene Set
            </Title>
          </Row>
          <Row>
            <TextArea
              placeholder="input a collection of gene symbols separated by commas"
              allowClear={true}
              style={{width:'90%'}}
              value={userinputgene2}
              maxLength={1000}
              showCount={true}
              autoSize={{minRows:2, maxRows: 10 }}
              onChange={(e) => {
                if (e.target.value) {
                  setUserinputgene(e.target.value.toString());
                  // console.log(e.target.value.toString().toUpperCase())
                } else {
                  setUserinputgene('');
                }
              }}
            />
            <Text
              style={{ color: '#4D96FF' }}
              onClick={() => {
                setUserinputgene2('AR,ARID1A,ARID1B,ARID2,ARID4B,ASF1A,ASH2L,ATXN1L,BCL11A,BCL7A,BCL7C,BCL9,BCOR,BMPER,BPTF,BRD2,BRD3,BRMS1L,C19orf71,C7orf61,CBX3,CBX5,CCDC144NL,CDK8,CENPA,CHAF1A,CHD7,CIC,CREBBP,CSNK2A1,DLGAP1-AS2,DPF1,DPT,E2F6,EHMT1,EHMT2,ELF1,ELF2,ELF4,ELK3,EN1,EP300,EP400,ERG,ETS1,EZH2,FAT2,FEV,FHL2,FOXI1,FOXK1,FOXK2,FOXP1,FSTL5,GATA2,GATA3,GATAD1,GATAD2A,GATAD2B,GCM1,GSE1,H2AZ1,H2BC21,H2BC8,H3-4,H3C1,H4C1,HDAC1,HDAC2,HDAC3,HERC2P3,HHAT,HIVEP1,HMG20A,HMGXB4,HNF1B,HNF4A,IQCJ-SCHIP1,IRF4,JUN,KAT14,KAT2B,KAT5,KCNQ1OT1,KDM1A,KDM2B,KDM6A,KLF3,KLF5,KLF8,KMT2A,KMT2C,KMT2D,KRTAP9-9,L3MBTL2,LDB1,LHX2,LHX3,LHX4,LIN37,LIN9,MAP6D1,MBD2,MBD3,MBIP,MCRS1,MED4,MGA,MTA1,MTA2,MTA3,MYB,MYOD1,NCOA3,NCOR1,NCOR2,NFIA,NFIB,NFIC,NFIX,NKAPP1,NKX6-2,NR2C1,PARP1,PAX2,PAX6,PAX7,PAX8,PAX9,PBRM1,PCGF1,PHF1,PHF12,POGZ,POLR1G,RB1,RBBP4,RBBP5,RBBP7,RBPJ,RCOR1,RERE,RNU6-6P,RNU6-8,RPL23AP42,SAP130,SAP30,SATB2,SIN3A,SIN3B,SLC24A2,SMARCA2,SMARCA4,SMARCB1,SMARCC1,SMARCC2,SMARCD1,SMARCD2,SMARCD3,SMARCE1,SMG7,SOX10,SOX17,SOX21-AS1,SOX5,SOX6,SOX9,SP7,SS18L1,SSBP3,ST18,SUDS3,SUZ12,TADA2A,TAF6,TBL1X,TBR1,TBXT,TEAD1,TERF2IP,TFIP11,TLE1,TLE5,TLX1,TLX3,TMEM163,TP53BP1,TRPS1,TRRAP,UBE2I,WIZ,YY1,ZNF330,ZNF608,ZNF609,ZNF644,ZNF676,ZZZ3');
              }}
            >
              e.g. AR,ARID1A,ARID1B,ARID2,ARID4B,ASF1A,ASH2L,ATXN1L,BCL11A,BCL7A,BCL7C,BCL9,BCOR,BMPER,BPTF,BRD2,BRD3,BRMS1L,C19orf71,C7orf61,CBX3,CBX5,CCDC144NL,CDK8,CENPA,CHAF1A,CHD7,CIC,CREBBP,CSNK2A1,DLGAP1-AS2,DPF1,DPT,E2F6,EHMT1,EHMT2,ELF1,ELF2,ELF4,ELK3,EN1,EP300,EP400,ERG,ETS1,EZH2,FAT2,FEV,FHL2,FOXI1,FOXK1,FOXK2,FOXP1,FSTL5,GATA2,GATA3,GATAD1,GATAD2A,GATAD2B,GCM1,GSE1,H2AZ1,H2BC21,H2BC8,H3-4,H3C1,H4C1,HDAC1,HDAC2,HDAC3,HERC2P3,HHAT,HIVEP1,HMG20A,HMGXB4,HNF1B,HNF4A,IQCJ-SCHIP1,IRF4,JUN,KAT14,KAT2B,KAT5,KCNQ1OT1,KDM1A,KDM2B,KDM6A,KLF3,KLF5,KLF8,KMT2A,KMT2C,KMT2D,KRTAP9-9,L3MBTL2,LDB1,LHX2,LHX3,LHX4,LIN37,LIN9,MAP6D1,MBD2,MBD3,MBIP,MCRS1,MED4,MGA,MTA1,MTA2,MTA3,MYB,MYOD1,NCOA3,NCOR1,NCOR2,NFIA,NFIB,NFIC,NFIX,NKAPP1,NKX6-2,NR2C1,PARP1,PAX2,PAX6,PAX7,PAX8,PAX9,PBRM1,PCGF1,PHF1,PHF12,POGZ,POLR1G,RB1,RBBP4,RBBP5,RBBP7,RBPJ,RCOR1,RERE,RNU6-6P,RNU6-8,RPL23AP42,SAP130,SAP30,SATB2,SIN3A,SIN3B,SLC24A2,SMARCA2,SMARCA4,SMARCB1,SMARCC1,SMARCC2,SMARCD1,SMARCD2,SMARCD3,SMARCE1,SMG7,SOX10,SOX17,SOX21-AS1,SOX5,SOX6,SOX9,SP7,SS18L1,SSBP3,ST18,SUDS3,SUZ12,TADA2A,TAF6,TBL1X,TBR1,TBXT,TEAD1,TERF2IP,TFIP11,TLE1,TLE5,TLX1,TLX3,TMEM163,TP53BP1,TRPS1,TRRAP,UBE2I,WIZ,YY1,ZNF330,ZNF608,ZNF609,ZNF644,ZNF676,ZZZ3
            </Text>
          </Row>
          <Row>
            <Col>
              <Title level={3}>
                2.
                <Button type="primary" onClick={onSubmit}>
                  Submit Job
                </Button>
              </Title>
            </Col>
          </Row>
        </Col>
        <Col md={14}>
          <Row justify={'center'}>
            <Title level={3}>
              Results:
            </Title>
            <Image src={gsea_demo} preview={false} width={'80%'}></Image>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
