"use strict";

const createSchemaCustomization = require(`./create-schema-customization`);
const onCreateNode = require(`./on-node-create`);
const setFieldsOnGraphQLNodeType = require(`./extend-node-type`);

exports.createSchemaCustomization = createSchemaCustomization;
exports.onCreateNode = onCreateNode;
exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType;