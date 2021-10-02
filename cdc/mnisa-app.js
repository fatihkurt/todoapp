"use strict"

const axios = require("axios")

axios.defaults.adapter = require('axios/lib/adapters/http');
 
exports.listTasks = endpoint => {
  return axios.request({
    method: "GET",
    baseURL: endpoint,
    url: "api/task",
    params: {
      userId: "1"
    },
    headers: { Accept: "application/json", 'Access-Control-Allow-Origin': '*' },
  })
}
exports.addTask = endpoint => {
  return axios.request({
    method: "POST",
    baseURL: endpoint,
    url: "/api/task",
    data: {
      userId: 1,
      name: "New Task"
    },
    headers: { Accept: "application/json", 'Access-Control-Allow-Origin': '*' },
  })
}
