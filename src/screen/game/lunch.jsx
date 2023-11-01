import React from "react";

import { CRow, CCol, CCard } from "@coreui/react";

import appConfig from "../../appconfig/appconfig";
import Search from "./search";

function searching() {
	return (
		<div className='search_container'>
			<CRow>
				<CCol>
					<CCard
						style={{
							width: "450px",
							height: "450px",
							backgroundColor: "transparent",
							border: "none",
						}}>
						<div className='slot_container'>
							<div className='column_auther'>
								<div className='avatar_auther_column'>
									<div className='avatar_auther'>
										<img
											src={
												appConfig.avatarArray[Math.floor(Math.random() * appConfig.avatarArray.length)]
													.avatar
											}
											alt={``}
										/>
									</div>
									<div className='auther_name'>
										{
											appConfig.avatarArray[Math.floor(Math.random() * appConfig.avatarArray.length)]
												.name
										}
									</div>
								</div>
							</div>
							<div className='column_opponent'>
								<Search />
							</div>
						</div>
					</CCard>
				</CCol>
			</CRow>
		</div>
	);
}

export default searching;
