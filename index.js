// Require the necessary discord.js classes
const { messageLink, channelLink } = require('discord.js');
const Discord = require('discord.js');
const { promises } = require('nodemailer/lib/xoauth2');
const { connect } = require('undici');
const { Client, GatewayIntentBits, REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;
const { token } = require('./config.json');

const points_1 = require("./database/points");



// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Login to Discord with your client's token
client.login(token);

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log(`Our bot has locked in by: ${client.user.tag}`);
    const channel = client.channels.cache.get('1030418901416300585');
    channel.send({
        content: 'select your role:',
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId('brifing')
                    .setLabel('Close').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('Snowsqual')
                    .setLabel('Near').setStyle(ButtonStyle.Primary),
            )],
    });
});

//Setting different Roles for the client+
const ROLES = {
    brifing: '1034858031067959306',
    polor: '1031761190445142066',
};


client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(
            ROLES[interaction.customId]
        );

        //Handling Error:-
        if (!role) {
            return interaction.reply({ content: 'Role not found', ephemeral: true });
        }
        return interaction.member.roles.add(role).then((member) => {
            interaction.reply({
                content: Ass(role, member, interaction),
                ephemeral: true,
            })
        }).catch((err) => {
            console.log(err);
            return interaction.reply({
                content: `Some thing went wrong. The ${role} is not added to you ${member}`,
                ephemeral: true,
            });
        });
    }
});

async function Ass(role, member, interaction) {

    const channel01 = client.channels.cache.find(channel => channel.id === '1030418942172336179')

    channel01.send(`Welcome to the brifing section ${member} ${interaction.guild.memberCount}`);

         
//THIS SECTION IS CAUSED THE BUG
    let roleID = "1034858031067959306";
    // let membersWithRole = interaction.guild.roles.cache.getAllUsers(roleID).members;
    let membersWithRole =  await interaction.guild.roles.cache.fetch(roleID).members;
    console.log(`Got ${membersWithRole.size} members with that role.`);                         



var Numbers_of_users = 500;


    if (Numbers_of_users >= 0 && Numbers_of_users <= 100) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get('1032955770951712778');
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === '1030787044433203260')
        channel01.setName(`Snowsquall: ${Numbers_of_users}/100`);
        // pointsADD(member);
    }
    else if (Numbers_of_users >= 101 && Numbers_of_users <= 500) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get('1035081493330006086');
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === '1032893322605363233')
        channel01.setName(`Thundersnow: ${Numbers_of_users}/500`);
    }
    else if (Numbers_of_users >= 501 && Numbers_of_users <= 1000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get('1035082147830190101');
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === '1032894075793313812')
        channel01.setName(`Snow flurry: ${Numbers_of_users}/1000`);
    }
    else if (Numbers_of_users >= 1001 && Numbers_of_users <= 3000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get('1035082319779864586');
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === '1032894244572123146')
        channel01.setName(`Lake-effect snow: ${Numbers_of_users}/3000`);
    }
    else if (Numbers_of_users >= 3001 && Numbers_of_users <= 10000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get('1035082851735048283');
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === '1032894444653006848')
        channel01.setName(`Extratropical cyclone: ${Numbers_of_users}/10000`);
    }
    else if (Numbers_of_users >= 10001 && Numbers_of_users >= 30000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get('1035087537938645043');
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === '1032894485857845341')
        channel01.setName(`Blizzard: ${Numbers_of_users}/30000`);
    }
    else {
        console.log('Error occured');
    }
    return `The ${role} is added to you ${member} ${interaction.guild.memberCount}`;

};
