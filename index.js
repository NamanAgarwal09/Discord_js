// Require the necessary discord.js classes
const { messageLink, channelLink } = require('discord.js');
const Discord = require('discord.js');
const { promises } = require('nodemailer/lib/xoauth2');
const { connect } = require('undici');
const { Client, GatewayIntentBits, REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;
const { token } = require('./config.json');


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
    const channel = client.channels.cache.get('ENTER_ID_HERE');
    channel.send({
        content: 'select your role:',
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId('polor')
                    .setLabel('Close').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('Near')
                    .setLabel('Near').setStyle(ButtonStyle.Primary),
            )],
    });
}
);

//Setting different Roles for the client+
const ROLES  = {
    polor: 'ENTER_ID_HERE',
   
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
        
        return interaction.member.roles
            .add(role)
            .then((member) => {
                interaction.reply({
                    content: Ass(role, member),
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

function Ass(role, member) {
    return `The ${role} is added to you ${member}`;
}
