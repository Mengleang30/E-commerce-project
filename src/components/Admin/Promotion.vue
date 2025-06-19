<template>
    <div class="container">
      <!-- Header Buttons -->
      <div class="top-bar">
        <button class="btn">Export CSV</button>
        <button class="btn">Import CSV</button>
        <span class="remaining">44/50</span>
        <span class="label">Coupons Remaining</span>
        <input type="text" placeholder="Search by name" v-model="search" class="search-input" />
      </div>
  
     
     <div class="coupon-bar">
      <div class="code">
    <button class="btn default">Set Default</button>
    <input type="text" placeholder="Create Code" class="but" />
    <button class="btn undo">Undo</button>
    <button class="btn create">Create Coupons</button>
            </div>
            <div class="limit">
    <span class="lim">Limits</span>
    <span class="Start">Start time</span>
    <span class="End">End time</span>
    <span class="new">New Coupon Code</span>
    <span class="Deal">Deal Type</span>
    <span class="Type">Coupon Type</span>
  
  </div>
    <div class="dat">
    <div>
    <input type="number" placeholder="##" class="input small" />
    
    </div>
    
    
    <input type="date" class="input" placeholder="End time" />
    <input type="date" class="input" placeholder="Start time" />
    <input placeholder="coupon code" class="put" />
     
    <select class="input select">
      <option>Discount</option>
      <option>10%</option>
      <option>20%</option>
      <option>50%</option>
      <option>Buy 1 Get 1</option>
    </select>

    <select class="input select">
      <option>string</option>
      <option>numeric</option>
    </select>
      </div>
   
          </div> 
  
  


      <!-- Data Table -->
      <table class="coupon-table">
        <thead>
          <tr>
            <th></th>
            <th>Take by</th>
            <th>Take date</th>
            <th>Status</th>
            <th>End time</th>
            <th>Start time</th>
            <th>Coupon content</th>
          </tr>
          <div class="back"></div>
            
            <th></th>
            <th>↑<span class="row">↓</span>
               </th>
            <th><div class="dropdown">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <i class="fas fa-caret-up"></i>
    <span>Redeemed</span>
  </div></th>
            <th>↑ <span class="row">↓</span> </th>
            <th>↑ <span class="row"> ↓</span></th>
            <th>↑ <span class="row"> ↓</span></th>
           
            
        </thead>
       
        <tbody>
          
          <tr v-for="(item, index) in filteredData" :key="index">
            
            <td><button class="delete">✕</button></td>
            <td>{{ item.name }}</td>
            <td>{{ item.takeDate }}</td>
            <td><span class="status">{{ item.status }}</span></td>
            <td>{{ item.endDate }}</td>
            <td>{{ item.startDate }}</td>
            <td>{{ item.code }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Footer -->
      <div class="footer">
        <span>Showing {{ data.length }} out of 50.</span>
        <div class="pagination">
          <button v-for="n in 5" :key="n">{{ n }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CouponTable',
    data() {
      return {
        search: '',
        startDate: '',
        endDate: '',
        discount: '',
        dealType: 'Discount',
        couponType: 'string',
        
       
      
        data: [
          {
            name: 'Mittie Saunders',
            takeDate: '03/01/2018',
            status: 'Redeemed',
            endDate: '03/28/2018',
            startDate: '05/17/2018',
            code: '89edijweh9d8r923e23',
          },
          {
            name: 'Elnora Hines',
            takeDate: '09/10/2018',
            status: 'Redeemed',
            endDate: '07/19/2018',
            startDate: '04/24/2018',
            code: 'dijwehd98r923e23769',
          },
          {
            name: 'Pauline Morris',
            takeDate: '11/18/2018',
            status: 'Redeemed',
            endDate: '12/18/2018',
            startDate: '12/19/2018',
            code: '46189edijweh9de2327',
          },
          // Add more entries...
        ],
    
      };
    },
    
    computed: {
      filteredData() {
        return this.data.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .row{
    color: #11131173;
   
  }
  .back{
    background-color: #1f0606;
  }
  .container {
    background: #fff;
    padding: 24px;
    font-family: "Segoe UI", sans-serif;
  }
  
  .top-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .filters {
    padding: 30px;

    gap: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
 
  input,
  select {
    padding: 6px 8px;
    border: 1px solid #ccc;
    max-width: 250px;
    border-radius: 4px;
    margin-left: 30px;
  }
  
  .search-input {
    margin-left: auto;
    flex-grow: 1;
    max-width: 250px;
  }
  
  .btn {
    
    border: 1px solid #ccc;
    padding: 6px 12px;
    background: white;
    cursor: pointer;
    border-radius: 4px;
  }
  .ntp{
    margin-top: 20px;
    margin-left: 20px;
    border: 1px solid #ccc;
    padding: 6px 12px;
    background: white;
    cursor: pointer;
    border-radius: 4px;

  }
  
  .btn.green {
    
    border-color: #28a745;
    color: white;
    background: #28a745;
  }
  
  .remaining {
    background: #f44336;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .label {
    font-weight: 500;
  }
  
  .coupon-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
    
  }
  .code{
    gap: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    
  }
  
  .coupon-table th,
  .coupon-table td {
    border-bottom: 1px solid #eee;
    padding: 10px;
    text-align: left;
    font-size: 14px;
  }
  
  .status {
    color: red;
    font-weight: bold;
  }
  
  .delete {
    /* background: rgba(122, 119, 119, 0.014);
   border-radius: 5px;
    border: 5px 5px;
    color: rgb(29, 28, 28);
    font-size: 16px;
    cursor: pointer; */
  margin-right: 20px;
  width: 20px;
  margin: 0 auto;
  padding: 1px;
  background-color: #f2f2f2;
  font-size: 10px;

    
  }
  
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }
  
  
  .pagination button {
    margin-left: 4px;
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }
  .set{
    
    height: 300px;
    width: 2000px;
    background-color: rgba(231, 223, 223, 0.459);
    border:2px solid #28a746b0;
    border-radius: 6px;
  }
  
  .coupon-bar {
   /* display: flex;
  align-items: center;
  flex-wrap: wrap; */
  
  gap: 10px;
  height: 250px;
  padding: 15px;
  border: 1px solid #c6e1c6;
  border-radius: 6px;
  background-color: #f9fff9;
  
}


.input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 120px;
}
.put{
  width: 300px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 500px;
  display: flex;
 
}
.but{
  width: 300px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 500px;
  display: flex;
  margin-left: 470px;
}
.input.small {
  width: 60px;
}

.select {
  background: white;
  cursor: pointer;
}

.btn {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f5f5f5;
  cursor: pointer;
  font-weight: bold;
} 

.btn.default {
  border: 1px solid #b2d8b2;
  
}

.btn.undo {
  background: #eee;
  
}

.btn.create {
  background: #28a745;
  color: white;
  border: none;
} 

.dat{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  
}
.box{  
      position: relative;
      width: 10000px;
      background-color: #28a745;
      padding: 20px;
      margin-top: 30px;
    }
    .limit{
    margin-top: 50px;
    
    color: rgba(8, 8, 8, 0.596);
    font-size: 18px;
    font-weight: 300;
    
  }
  .lim{
    margin-left: 30px;

  }
  .Start{
    margin-left: 100px;
  }
  .End{
    margin-left: 130px;
  }
  .new{
    margin-left: 130px;
  }
  .Deal{
    margin-left: 370px;
  }
  .Type{
    margin-left:70px ;
  }
  .hi{
    width: 90px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1f0606;
  font-size: 18px;
}

    .sort-icon {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .dropdown {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 12px;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      width: 50%;
      margin-left: -25px;
    }

    .dropdown i {
      color: green;
    }
  

  </style>
  