import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function Home({ store }) {

  function update() {
    store.updateTab("update");
  }

  function search() {
    store.updateTab("search");
  }

  return (
    <div>

      <h1>Electronic invoice registry demo</h1>

      <p className="lead">
        Welcome to the next generation international and open electronic invoice address registry.
      </p>

      <p><a href="#" onClick={update}>Update your company invoicing address data</a> or <a href="#" onClick={search}>browse companies registry</a>.</p>

      <hr />

      <p className="text-info">This demo version contains only a small snapshot of all invoicing addresses and companies. Some example addresses to test out the demo:</p>

<div className="table-responsive">
<table className="table table-bordered table-hover table-condensed table-demo">
<tbody><tr>
<td>Yrityksen nimi</td>
<td>Y-tunnus</td>
<td>Operaattori</td>
<td>Lähettää</td>
<td>Vastaanottaa</td>
<td>Vastaanotto-osoite</td>
<td>Muokattu</td>
<td>Välittäjän tunnus</td>
<td>Lähetyslupa</td>
<td>OVT-tunnus</td>
<td>Esitystavat</td>
</tr>
<tr>
<td>TAMPEREEN RUDOLF STEINER-LASTENTARHAN KANNATUSYHDISTYS RY</td>
<td>0509075-4</td>
<td>Basware Oyj</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003705090754 OVT-tunnus</td>
<td>04.04.2011</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3705090754</td>
<td>5</td>
</tr>
<tr>
<td>Aamos Oy - Tietotekniikan koulutus</td>
<td>1644433-5</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003716444335 OVT-tunnus</td>
<td>16.04.2014</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3716444335</td>
<td> </td>
</tr>
<tr>
<td>Conexbird Oy</td>
<td>2548885-8</td>
<td>Maventa</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003725488858 OVT-tunnus</td>
<td>17.09.2015</td>
<td>3721291126</td>
<td>Kyllä</td>
<td>3725488858</td>
<td> </td>
</tr>
<tr>
<td>Kiinteistö Oy Oulun Tervakukkatie 34-36</td>
<td>2355683-7</td>
<td>Basware Oyj</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003723556837 OVT-tunnus</td>
<td>19.10.2012</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3723556837</td>
<td> </td>
</tr>
<tr>
<td>K-Kauppiasliiton Maatalous- ja Rautakauppiasyhdistys ry</td>
<td>1524919-1</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003715249191 OVT-tunnus</td>
<td>14.09.2007</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3715249191</td>
<td> </td>
</tr>
<tr>
<td>Tietotekniikkatoimisto Hitsaamo Oy</td>
<td>2087817-9</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003720878179 OVT-tunnus</td>
<td>19.09.2007</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3720878179</td>
<td> </td>
</tr>
<tr>
<td> </td>
<td>2348664-8</td>
<td>Apix Messaging Oy</td>
<td>Kyllä</td>
<td>Ei</td>
<td> </td>
<td>20.05.2016</td>
<td>3723327487</td>
<td>Ei</td>
<td>372348664835</td>
<td> </td>
</tr>
<tr>
<td>KDR Ryhmä Oy</td>
<td>2051845-6</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003720518456 OVT-tunnus</td>
<td>21.09.2012</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3720518456</td>
<td> </td>
</tr>
<tr>
<td>Kiinteistö Oy Porvoon Fredrika Runeberginkatu</td>
<td>2760328-2</td>
<td>OpusCapita Group Oy</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003727603282 OVT-tunnus</td>
<td>30.05.2016</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3727603282</td>
<td> </td>
</tr>
<tr>
<td>360 Plus Oy</td>
<td>2659753-8</td>
<td>Nordea</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>FI6213763000140986 IBAN</td>
<td>04.03.2015</td>
<td>NDEAFIHH</td>
<td>Kyllä</td>
<td> </td>
<td>Finvoice</td>
</tr>
<tr>
<td>360 Plus Oy</td>
<td>2659753-8</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003726597538 OVT-tunnus</td>
<td>26.02.2015</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3726597538</td>
<td>Finvoice</td>
</tr>
<tr>
<td>A-Granit Oy</td>
<td>2398485-8</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003723984858 OVT-tunnus</td>
<td>17.05.2011</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3723984858</td>
<td> </td>
</tr>
<tr>
<td>Aatunkulman Hammaslääkärit Oy</td>
<td>2344356-8</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003723443568 OVT-tunnus</td>
<td>02.12.2014</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3723443568</td>
<td> </td>
</tr>
<tr>
<td>Ab A.Kasten Oy</td>
<td>2404537-7</td>
<td>Basware Oyj</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003724045377 OVT-tunnus</td>
<td>31.12.2015</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3724045377</td>
<td>5</td>
</tr>
<tr>
<td>Ab A.Kasten Oy</td>
<td>2404537-7</td>
<td>Nordea</td>
<td>Kyllä</td>
<td>Ei</td>
<td> </td>
<td>03.06.2016</td>
<td>NDEAFIHH</td>
<td>Ei</td>
<td> </td>
<td>5</td>
</tr>
<tr>
<td>Activeark Labs Oy</td>
<td>2181980-8</td>
<td>Basware Oyj</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003721819808 OVT-tunnus</td>
<td>27.03.2008</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3721819808</td>
<td>5</td>
</tr>
<tr>
<td>Activeark Labs Oy</td>
<td>2181980-8</td>
<td>Nordea</td>
<td>Ei</td>
<td>Kyllä</td>
<td>FI0817453000058596 IBAN</td>
<td>19.03.2010</td>
<td>NDEAFIHH</td>
<td>Kyllä</td>
<td> </td>
<td>5</td>
</tr>
<tr>
<td>Adusso Oy</td>
<td>2430372-7</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003724303727 OVT-tunnus</td>
<td>15.12.2011</td>
<td>3710948874</td>
<td>Kyllä</td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>Ahlgren Harjula Konttinen Oy</td>
<td>2287798-9</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>003722877989 OVT-tunnus</td>
<td>08.01.2015</td>
<td>3710948874</td>
<td>Kyllä</td>
<td>3722877989</td>
<td> </td>
</tr>
<tr>
<td>Alppilan Salamat ry</td>
<td>1824104-8</td>
<td>Basware Oyj</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003718241048 OVT-tunnus</td>
<td>19.12.2014</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3718241048</td>
<td> </td>
</tr>
<tr>
<td>Antikvariaatti Makedonia</td>
<td>1123376-6</td>
<td>OpusCapita Group Oy</td>
<td>Kyllä</td>
<td>Ei</td>
<td> </td>
<td>17.01.2013</td>
<td>3710948874</td>
<td>Ei</td>
<td>3711233766</td>
<td> </td>
</tr>
<tr>
<td>As Oy Helsingin Poseidon</td>
<td>1890993-3</td>
<td>Handelsbanken</td>
<td>Ei</td>
<td>Kyllä</td>
<td>FI7431313001216738 IBAN</td>
<td>11.11.2010</td>
<td>HANDFIHH</td>
<td>Kyllä</td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>As Oy Ilmajoen Ainonkulma</td>
<td>2466197-0</td>
<td>Basware Oyj</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003724661970 OVT-tunnus</td>
<td>24.05.2016</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3724661970</td>
<td> </td>
</tr>
<tr>
<td>As Oy Ilmajoen Polkuvainio Timantti</td>
<td>2611723-1</td>
<td>Basware Oyj</td>
<td>Ei</td>
<td>Kyllä</td>
<td>003726117231 OVT-tunnus</td>
<td>27.05.2015</td>
<td>BAWCFI22</td>
<td>Kyllä</td>
<td>3726117231</td>
<td> </td>
</tr>
<tr>
<td>AS OY JKL TAPIONKULMA II</td>
<td>4138810-1</td>
<td>Danske Bank Oyj</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>FI5580001970750908 IBAN</td>
<td>27.06.2016</td>
<td>DABAFIHH</td>
<td>Kyllä</td>
<td> </td>
<td>Finvoice</td>
</tr>
<tr>
<td>AS OY JKL VALAJANKATU 3</td>
<td>1940099-5</td>
<td>Danske Bank Oyj</td>
<td>Kyllä</td>
<td>Kyllä</td>
<td>FI7980001571042770 IBAN</td>
<td>27.06.2016</td>
<td>DABAFIHH</td>
<td>Kyllä</td>
<td> </td>
<td>Finvoice</td>
</tr>
</tbody></table>
</div>
    </div>
  );
}

Home.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Home);
