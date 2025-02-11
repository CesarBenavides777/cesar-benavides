import { NextResponse } from "next/server"
import twilio from 'twilio'
import type { Twilio } from 'twilio'
const ENDPOINT = "https://fragis.fra.dot.gov/arcgis/rest/services/FRA/FRAGradeXing/MapServer/0/query?f=json&geometry=%7B%22spatialReference%22%3A%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D%2C%22xmin%22%3A-10883595.788283208%2C%22ymin%22%3A3535209.89254053%2C%22xmax%22%3A-10883594.892536784%2C%22ymax%22%3A3535210.7882869546%7D&outFields=ACC_LINK%2CCITYCD%2CCROSSING%2CCountyCode%2CEFFDATE%2CHIGHWAY%2CINIT%2CINV_LINK%2CLATITUDE%2CLLSOURCE%2CLONGITUD%2CMILEPOST%2CPOLCONT%2CPOSXING%2CPRVCAT%2CPRVIND%2CPRVSIGN%2CRAILROAD%2CRRCONT%2CRRDIV%2CRRSUBDIV%2CSTCYFIPS%2CSTREET%2CStateCode%2CTTSTN%2CTYPE%2CTYPEXING%2CWHISTBAN&spatialRel=esriSpatialRelIntersects&where=1%3D1&geometryType=esriGeometryEnvelope&inSR=102100&outSR=102100"

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

const client: Twilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
    const response = await fetch(ENDPOINT)
    const data = await response.json()

    const isDown = data.features.attrubutes.RAILROAD === "Down"

    // send text message if isDown is true
    if (isDown) {
        client.messages.create({
            body: 'The train is down',
            from: '+18887943792',
            to: '+12104145798'
        })
    }
    return NextResponse.json({ isDown })
}
