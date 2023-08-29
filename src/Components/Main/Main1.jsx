// /* global kakao */
// import React, { useEffect, useRef } from 'react';


// const Main1 = () => {
//   const mapContainerRef = useRef(null);
//   const riverLevelSelectorRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const mapOption = {
//       center: new kakao.maps.LatLng(35.22321056305155, 127.64061248095724),
//       level: 3
//     };

//     mapRef.current = new kakao.maps.Map(mapContainerRef.current, mapOption);
//     return () => {
//       // Cleanup (if needed) can go here
//     };
//   }, []);

//   const RiverLevels = {
//     WARNING: 'warning',
//     DANGER: 'danger'
//   };


//   const warningArea = [
//     new kakao.maps.LatLng(35.18768475612574, 127.62328828379695),
//     new kakao.maps.LatLng(35.188051067623164, 127.62391690004533),
//     new kakao.maps.LatLng(35.18863504673078, 127.62428368293553),
//     new kakao.maps.LatLng(35.18942604081486, 127.6247069528378),
//     new kakao.maps.LatLng(35.19006386867609, 127.62511807831473),
//     new kakao.maps.LatLng(35.19055309372784, 127.62550611207274),
//     new kakao.maps.LatLng(35.191100334529736, 127.6260043923392),
//     new kakao.maps.LatLng(35.19151311633773, 127.62635891044665),
//     new kakao.maps.LatLng(35.19295633322984, 127.62615038882204),
//     new kakao.maps.LatLng(35.19399922944458, 127.62666347465446),
//     new kakao.maps.LatLng(35.19586283507045, 127.62881895079953),
//     new kakao.maps.LatLng(35.196419402322014, 127.63098637908382),
//     new kakao.maps.LatLng(35.197321866862815, 127.63249768959012),
//     new kakao.maps.LatLng(35.198824798411174, 127.63293758885433),
//     new kakao.maps.LatLng(35.20046969481686, 127.63380686372638),
//     new kakao.maps.LatLng(35.20212561647169, 127.63256787586947),
//     new kakao.maps.LatLng(35.20306434309652, 127.63231160403507),
//     new kakao.maps.LatLng(35.203875855439115, 127.63225200602287),
//     new kakao.maps.LatLng(35.20558487920292, 127.63292415090427),
//     new kakao.maps.LatLng(35.20605837391831, 127.63372948890111),
//     new kakao.maps.LatLng(35.20668669466291, 127.63422855088227),
//     new kakao.maps.LatLng(35.2071867009369, 127.63513295040597),
//     new kakao.maps.LatLng(35.207128184653456, 127.6359780963411),
//     new kakao.maps.LatLng(35.20691372635324, 127.6373381684867),
//     new kakao.maps.LatLng(35.20699824436004, 127.63840406544375),
//     new kakao.maps.LatLng(35.2075783499121, 127.63949581390256),
//     new kakao.maps.LatLng(35.208575480891284, 127.64012960805923),
//     new kakao.maps.LatLng(35.2095571385425, 127.6402800811597),
//     new kakao.maps.LatLng(35.21026096219093, 127.64013185529434),
//     new kakao.maps.LatLng(35.211163883242456, 127.63983143611205),
//     new kakao.maps.LatLng(35.212019707752816, 127.6399150283966),
//     new kakao.maps.LatLng(35.212848551258446, 127.63998742821445),
//     new kakao.maps.LatLng(35.213416135087854, 127.64003581355584),
//     new kakao.maps.LatLng(35.21463317386778, 127.63999045217616),
//     new kakao.maps.LatLng(35.2163288854642, 127.63976213441909),
//     new kakao.maps.LatLng(35.218185900865016, 127.63971080623664),
//     new kakao.maps.LatLng(35.21954511399606, 127.64005097681785),
//     new kakao.maps.LatLng(35.22179428193378, 127.64083750279214),
//     new kakao.maps.LatLng(35.222703600085836, 127.64103137824503),
//     new kakao.maps.LatLng(35.223709382685044, 127.64173128418277),
//     new kakao.maps.LatLng(35.22582903147827, 127.64314298558021),
//     new kakao.maps.LatLng(35.22768335925407, 127.64359700243462),
//     new kakao.maps.LatLng(35.22970394748113, 127.643294398206),
//     new kakao.maps.LatLng(35.23033502716246, 127.64326642499685),
//     new kakao.maps.LatLng(35.23105354974946, 127.64374445428226),
//     new kakao.maps.LatLng(35.23231454038717, 127.64390820919378),
//     new kakao.maps.LatLng(35.23440787374284, 127.6434853313366),
//     new kakao.maps.LatLng(35.23542134759053, 127.64273532584518),
//     new kakao.maps.LatLng(35.236416907523875, 127.64196318913896),
//     new kakao.maps.LatLng(35.23690348837862, 127.64198899484025),
//     new kakao.maps.LatLng(35.23709119442033, 127.64143568738608),
//     new kakao.maps.LatLng(35.23690762292242, 127.64120903223053),
//     new kakao.maps.LatLng(35.23650718826936, 127.6410850369948),
//     new kakao.maps.LatLng(35.236164930168435, 127.64103840092014),
//     new kakao.maps.LatLng(35.235565454796514, 127.64105565567195),
//     new kakao.maps.LatLng(35.23519037127439, 127.6412504456376),
//     new kakao.maps.LatLng(35.235085500323, 127.64148031792145),
//     new kakao.maps.LatLng(35.234858459474246, 127.64180260477723),
//     new kakao.maps.LatLng(35.23453695697226, 127.64209118882006),
//     new kakao.maps.LatLng(35.23417518714769, 127.64232452574475),
//     new kakao.maps.LatLng(35.233510900919825, 127.6426653289038),
//     new kakao.maps.LatLng(35.23232374771556, 127.6430239710744),
//     new kakao.maps.LatLng(35.23184129391155, 127.64306959720984),
//     new kakao.maps.LatLng(35.23096919916114, 127.64265626840209),
//     new kakao.maps.LatLng(35.230636187568045, 127.64256576218219),
//     new kakao.maps.LatLng(35.23008791500611, 127.64227583094176),
//     new kakao.maps.LatLng(35.22959336964537, 127.6420522360688),
//     new kakao.maps.LatLng(35.22942264839723, 127.64195202750524),
//     new kakao.maps.LatLng(35.229116733167196, 127.64185075459203),
//     new kakao.maps.LatLng(35.22812688340334, 127.64154637292717),
//     new kakao.maps.LatLng(35.22684768775946, 127.64141547420134),
//     new kakao.maps.LatLng(35.2260811812139, 127.64148633272542),
//     new kakao.maps.LatLng(35.22537875454334, 127.64137096142555),
//     new kakao.maps.LatLng(35.22446350648737, 127.64059486766209),
//     new kakao.maps.LatLng(35.22385411243479, 127.63993103310848),
//     new kakao.maps.LatLng(35.2234054971137, 127.63954307015764),
//     new kakao.maps.LatLng(35.22296479139489, 127.6393638689518),
//     new kakao.maps.LatLng(35.22247925262027, 127.63914038255585),
//     new kakao.maps.LatLng(35.22193917193657, 127.63900434203146),
//     new kakao.maps.LatLng(35.22129971680109, 127.63891145954963),
//     new kakao.maps.LatLng(35.22037225296948, 127.63873943638029),
//     new kakao.maps.LatLng(35.21961586088278, 127.63860170781935),
//     new kakao.maps.LatLng(35.21878742286105, 127.63845243430279),
//     new kakao.maps.LatLng(35.21802120643438, 127.63846840065587),
//     new kakao.maps.LatLng(35.21711973774251, 127.6384942908337),
//     new kakao.maps.LatLng(35.21376715109981, 127.63842410732332),
//     new kakao.maps.LatLng(35.21298325559524, 127.63837403954058),
//     new kakao.maps.LatLng(35.211757493416656, 127.63836444393118),
//     new kakao.maps.LatLng(35.210574826571545, 127.63872858447084),
//     new kakao.maps.LatLng(35.210116324114274, 127.63850534866003),
//     new kakao.maps.LatLng(35.20960634759718, 127.63778751484583),
//     new kakao.maps.LatLng(35.208123416078834, 127.63526104656648),
//     new kakao.maps.LatLng(35.20686466437379, 127.63294506357414),
//     new kakao.maps.LatLng(35.20623931959031, 127.63187498387141),
//     new kakao.maps.LatLng(35.20575485296214, 127.63144294619721),
//     new kakao.maps.LatLng(35.20507164127312, 127.6310972287281),
//     new kakao.maps.LatLng(35.20436024525777, 127.6309709285902),
//     new kakao.maps.LatLng(35.20357668792646, 127.63085505405827),
//     new kakao.maps.LatLng(35.20327018927063, 127.63086366506154),
//     new kakao.maps.LatLng(35.20287318885926, 127.63094295436373),
//     new kakao.maps.LatLng(35.20236395522243, 127.63093901575886),
//     new kakao.maps.LatLng(35.20178164484339, 127.63112119115345),
//     new kakao.maps.LatLng(35.200924838786285, 127.6312243728158),
//     new kakao.maps.LatLng(35.20042895277038, 127.63125347883268),
//     new kakao.maps.LatLng(35.19948058497727, 127.63163046936725),
//     new kakao.maps.LatLng(35.198299883406214, 127.63162132872893),
//     new kakao.maps.LatLng(35.197581706499975, 127.63106674123726),
//     new kakao.maps.LatLng(35.19725462830805, 127.62983439397465),
//     new kakao.maps.LatLng(35.19686672556745, 127.62816236941067),
//     new kakao.maps.LatLng(35.19627716028696, 127.62713665490865),
//     new kakao.maps.LatLng(35.19559654762937, 127.6262859413005),
//     new kakao.maps.LatLng(35.194833053313396, 127.62577499258757),
//     new kakao.maps.LatLng(35.19391724244013, 127.6250872053452),
//     new kakao.maps.LatLng(35.193197391685345, 127.62485111189143),
//     new kakao.maps.LatLng(35.19159460496931, 127.62454238637275),
//     new kakao.maps.LatLng(35.19054217669475, 127.62412808682559),
//     new kakao.maps.LatLng(35.189679811581236, 127.62356153765744),
//     new kakao.maps.LatLng(35.18911639774484, 127.62270083806993),
//     new kakao.maps.LatLng(35.18865054201804, 127.62214831578503),
//     new kakao.maps.LatLng(35.18815352839991, 127.62239705105821)
//   ];


//   const dangerArea = [
//     new kakao.maps.LatLng(35.18809305304961, 127.6227643959906),
//     new kakao.maps.LatLng(35.18673346959142, 127.62423620155641),
//     new kakao.maps.LatLng(35.18587440210585, 127.62477858115679),
//     new kakao.maps.LatLng(35.18668330760369, 127.6252239364896),
//     new kakao.maps.LatLng(35.18809086829693, 127.62493827775693),
//     new kakao.maps.LatLng(35.18978214088691, 127.62556608043151),
//     new kakao.maps.LatLng(35.19120131561217, 127.62652121290901),
//     new kakao.maps.LatLng(35.19326235090468, 127.62797541332377),
//     new kakao.maps.LatLng(35.19525091522541, 127.63036244961428),
//     new kakao.maps.LatLng(35.196139845784145, 127.63274107522979),
//     new kakao.maps.LatLng(35.19867496133369, 127.63401253529963),
//     new kakao.maps.LatLng(35.20180998411938, 127.63432240833868),
//     new kakao.maps.LatLng(35.203145515349114, 127.63402531672934),
//     new kakao.maps.LatLng(35.20460251119086, 127.63462964239709),
//     new kakao.maps.LatLng(35.20556299472687, 127.63709699998533),
//     new kakao.maps.LatLng(35.206884177769034, 127.63952331661052),
//     new kakao.maps.LatLng(35.208877389813246, 127.64098857922507),
//     new kakao.maps.LatLng(35.211133534712445, 127.64045719338507),
//     new kakao.maps.LatLng(35.21338433215885, 127.64093614353551),
//     new kakao.maps.LatLng(35.217280831929294, 127.64041761305099),
//     new kakao.maps.LatLng(35.21848333353841, 127.64141556160374),
//     new kakao.maps.LatLng(35.21948520963199, 127.64285129882866),
//     new kakao.maps.LatLng(35.22143585140876, 127.64214175277743),
//     new kakao.maps.LatLng(35.226133077533426, 127.64359574490133),
//     new kakao.maps.LatLng(35.22773527527653, 127.64400384295955),
//     new kakao.maps.LatLng(35.229793259334656, 127.64344889163483),
//     new kakao.maps.LatLng(35.23160896068549, 127.64438597953797),
//     new kakao.maps.LatLng(35.232981613130086, 127.64389150989811),
//     new kakao.maps.LatLng(35.235581537746924, 127.64312108790087),
//     new kakao.maps.LatLng(35.23745006978569, 127.64259752749997),
//     new kakao.maps.LatLng(35.23835833182769, 127.64298920304878),
//     new kakao.maps.LatLng(35.23841062552274, 127.6416273455897),
//     new kakao.maps.LatLng(35.23827758593507, 127.64121981458588),
//     new kakao.maps.LatLng(35.23708055563857, 127.64089180299277),
//     new kakao.maps.LatLng(35.236180485271895, 127.64065402204945),
//     new kakao.maps.LatLng(35.235097248463674, 127.6409640870333),
//     new kakao.maps.LatLng(35.2344718649569, 127.64161829854814),
//     new kakao.maps.LatLng(35.2336214464296, 127.64221579923253),
//     new kakao.maps.LatLng(35.232998505751446, 127.64240862525418),
//     new kakao.maps.LatLng(35.232214323421225, 127.6424134282056),
//     new kakao.maps.LatLng(35.23102624974578, 127.64209648056013),
//     new kakao.maps.LatLng(35.229767352527865, 127.64153731720941),
//     new kakao.maps.LatLng(35.22875232479346, 127.64088122673103),
//     new kakao.maps.LatLng(35.22689845142866, 127.640339392826),
//     new kakao.maps.LatLng(35.22615113327369, 127.64019072431337),
//     new kakao.maps.LatLng(35.22490274714327, 127.63934611746889),
//     new kakao.maps.LatLng(35.223354783375356, 127.63890559896743),
//     new kakao.maps.LatLng(35.222258391284456, 127.63829289248994),
//     new kakao.maps.LatLng(35.21982744323389, 127.63779058266915),
//     new kakao.maps.LatLng(35.218476079570195, 127.6376701771703),
//     new kakao.maps.LatLng(35.21742156440728, 127.63766192951508),
//     new kakao.maps.LatLng(35.21526862542289, 127.63742543343687),
//     new kakao.maps.LatLng(35.21428621329846, 127.63741775357046),
//     new kakao.maps.LatLng(35.21269201823462, 127.63719662281663),
//     new kakao.maps.LatLng(35.21123105168333, 127.63734994310268),
//     new kakao.maps.LatLng(35.210100213204015, 127.63642957955886),
//     new kakao.maps.LatLng(35.20926285077797, 127.63454510141527),
//     new kakao.maps.LatLng(35.208491761640055, 127.63377036042722),
//     new kakao.maps.LatLng(35.20522634972965, 127.63081290446922),
//     new kakao.maps.LatLng(35.20301161486898, 127.63032358223172),
//     new kakao.maps.LatLng(35.20051992924999, 127.62935996836616),
//     new kakao.maps.LatLng(35.19879564925484, 127.6281497684528),
//     new kakao.maps.LatLng(35.196947504015334, 127.62648846896182),
//     new kakao.maps.LatLng(35.194685982420786, 127.62458251612347),
//     new kakao.maps.LatLng(35.19315705361467, 127.62393397583553),
//     new kakao.maps.LatLng(35.190779371259175, 127.62357542860235),
//     new kakao.maps.LatLng(35.19017596950675, 127.62172625109278),
//     new kakao.maps.LatLng(35.190352960921814, 127.62060768108996),
//     new kakao.maps.LatLng(35.189651576436994, 127.62028394226935)
//   ];
//   function displayPolygon(riverLevel) {

//     let polygonCoordinates;
//     let fillColor;

//     switch (riverLevel) {
//       case RiverLevels.WARNING:
//         polygonCoordinates = warningArea;
//         fillColor = 'yellow'; // assuming you want it yellow for warning
//         break;
//       case RiverLevels.DANGER:
//         polygonCoordinates = dangerArea;
//         fillColor = 'red';
//         break;
//       default:
//         console.error("Invalid river level specified.");
//         return;
//     }

//     const polygon = new kakao.maps.Polygon({
//       path: polygonCoordinates,
//       fillColor: fillColor,
//       fillOpacity: 0.5
//     });

//     polygon.setMap(mapRef.current);
//   }

//   function updatePolygon() {
//     const selectedRiverLevel = riverLevelSelectorRef.current.value;
//     displayPolygon(selectedRiverLevel);
//   }
//   return (
//     <>
//       <div>통제(예정) 현황</div>
//       <select ref={riverLevelSelectorRef}>
//         <option value="warning">Warning</option>
//         <option value="danger">Danger</option>
//       </select>

//       <button onClick={updatePolygon}>Update Map</button>
//       <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }}></div>
//     </>
//   )
// }

// export default Main1
/* global kakao */
import React, { useEffect, useRef  } from 'react';
import axios from 'axios';

const Main1 = () => {
  const mapRef = useRef(null);
  const LEVEL = 2; 

  useEffect(() => {
      const container = mapRef.current;
      const options = {
          center: new kakao.maps.LatLng(35.18768475612574, 127.62328828379697),
          level: 3
      };
      const map = new kakao.maps.Map(container, options);

      axios.get('http://10.125.121.184:8080/ctrlarea')
          .then(response => {
              const areas = response.data.filter(item => item.level === LEVEL);
              
            const path = areas.map(area => new kakao.maps.LatLng(area.latitude, area.longtitude));
            
            const polygon = new kakao.maps.Polygon({
                map: map,
                path: path,
                strokeWeight: 3,
                strokeColor: '#39f',
                strokeOpacity: 0.8,
                fillColor: '#39f',
                fillOpacity: 0.7

              });
          })
          .catch(error => {
              console.error("Error fetching areas:", error);
          });

      axios.get('http://10.125.121.184:8080/ctrlpoint')
          .then(response => {
              const points = response.data.filter(item => item.level === LEVEL);
              
              points.forEach(point => {
                  const markerPosition = new kakao.maps.LatLng(point.latitude, point.longtitude);
                  const marker = new kakao.maps.Marker({
                      position: markerPosition
                  });
                  marker.setMap(map);
              });
          })
          .catch(error => {
              console.error("Error fetching points:", error);
          });
  }, []);

  return (
      <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
  );
}

export default Main1;
