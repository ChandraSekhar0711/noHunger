import React from 'react'
import {  Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
export default function BreadCrumb(props) {
  return (
    
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.300' />}>
        <BreadcrumbItem>

          <BreadcrumbLink as={Link} to={"/Requests"}>Requests</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink >{props.path}</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink >{props.requestId}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>


  )
}
