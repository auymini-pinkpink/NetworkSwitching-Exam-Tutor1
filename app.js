// --- APPLICATION STATE & DATA SOURCES ---
const syllabusModules = [
    {
        id: 1,
        title: "1. Data Link Layer & Ethernet",
        desc: "Ethernet frames, MAC addressing, switches, ARP resolution, and IPv4/IPv6 address abbreviations.",
        explanation: "The Data Link Layer (OSI Layer 2) is responsible for node-to-node delivery across the local network segment. Switches use MAC address tables to forward frames intelligently rather than flooding them like old hubs. ARP (Address Resolution Protocol) dynamically maps IP addresses to physical MAC addresses.",
        analogy: "Think of an office building where the Data Link layer is like internal room numbers and staff badges (MAC addresses), whereas IP addresses are like mailing addresses used by postal couriers across cities.",
        diagramNote: "[PC A] -- (MAC: AA:AA) ---> [Switch MAC Table] ---> (MAC: BB:BB) -- [PC B]",
        workedExample: "ARP Request: 'Who has IP 192.168.1.1?' Broadcasted to FF:FF:FF:FF:FF:FF. Target replies with its unicast MAC address, which the switch stores in its MAC table.",
        questions: [
            {
                q: "What is the primary function of a network switch compared to a traditional hub?",
                options: [
                    "A hub floods all frames out every port, while a switch inspects destination MAC addresses and forwards frames only to the appropriate port.",
                    "A switch routes packets between different subnets without needing a default gateway.",
                    "A switch translates IPv4 addresses into IPv6 prefixes.",
                    "A hub encrypts all Layer 2 frames automatically."
                ],
                correct: 0,
                explanation: "Correct! Switches build MAC tables dynamically and perform unicast forwarding, reducing unnecessary network traffic and collisions."
            },
            {
                q: "What is the broadcast MAC address used in Ethernet networks?",
                options: ["00-00-00-00-00-00", "FF-FF-FF-FF-FF-FF", "11-22-33-44-55-66", "AC-DE-48-00-11-22"],
                correct: 1,
                explanation: "Correct! FF-FF-FF-FF-FF-FF is the universal Layer 2 broadcast address processed by all NICs on the local segment."
            },
            {
                q: "Which IPv6 address abbreviation rule is correct for 2001:0db8:0000:0000:0000:ff00:0042:8329?",
                options: [
                    "2001:db8::ff00:42:8329",
                    "2001:db8:0:0:0:ff00:42:8329",
                    "2001:db8::::ff00:42:8329",
                    "2001:db8:0000::ff00:42:8329"
                ],
                correct: 0,
                explanation: "Correct! Consecutive blocks of zeros can be replaced once with a double colon (::), and leading zeros within any block can be omitted."
            }
        ],
        summary: "Switches maintain MAC tables to filter and forward frames efficiently. ARP resolves Layer 3 IPs to Layer 2 MACs."
    },
    {
        id: 2,
        title: "2. IPv4 Subnetting & VLSM",
        desc: "CIDR notation, subnet masks, usable host ranges, and variable-length subnet mask allocation.",
        explanation: "Subnetting splits a large network into smaller logical subnetworks. CIDR (Classless Inter-Domain Routing) uses a slash notation (e.g. /24) to denote network bits. VLSM allows assigning custom subnet sizes matching specific host requirements without wasting IP addresses.",
        analogy: "Subnetting is like dividing a large apartment building into numbered floors and suites so mail gets delivered precisely where needed.",
        diagramNote: "Network: 192.168.1.0/24 | Subnet Mask: 255.255.255.0 | Usable Hosts: .1 to .254",
        workedExample: "For a /26 subnet (255.255.255.192), total IP count is 2^6 = 64. Usable hosts = 62 (excluding network ID and broadcast).",
        questions: [
            {
                q: "How many usable host addresses are available in a /27 subnet?",
                options: ["14", "30", "62", "254"],
                correct: 1,
                explanation: "Correct! A /27 leaves 32 - 27 = 5 host bits. 2^5 = 32 total IPs. Minus network ID and broadcast = 30 usable hosts."
            },
            {
                q: "What is the broadcast address for subnet 192.168.10.0/26?",
                options: ["192.168.10.63", "192.168.10.64", "192.168.10.127", "192.168.10.255"],
                correct: 0,
                explanation: "Correct! Block size is 64. Subnets are 0-63, 64-127, etc. The first subnet (0-63) has 63 as its broadcast address."
            },
            {
                q: "When performing VLSM calculations, how should subnet blocks be allocated?",
                options: [
                    "From smallest host requirement to largest host requirement",
                    "From largest host requirement to smallest host requirement",
                    "Randomly across available private IP ranges",
                    "Alphabetically by subnet names"
                ],
                correct: 1,
                explanation: "Correct! Always allocate from largest to smallest requirement to ensure contiguous block allocation without overlapping boundaries."
            }
        ],
        summary: "Calculate block sizes using 2^(32-CIDR). Always determine Network ID, Usable Range, and Broadcast IP in exam calculations."
    },
    {
        id: 3,
        title: "3. Transport Layer (TCP & UDP)",
        desc: "TCP reliable connections, 3-way handshake, sequence/acknowledgement numbers, flags, and UDP comparison.",
        explanation: "The Transport Layer manages end-to-end communication. TCP provides reliable, connection-oriented delivery with error checking and flow control, whereas UDP is connectionless and fast (used for DNS/streaming).",
        analogy: "TCP is like a registered postal parcel requiring a signature receipt for every delivery, while UDP is like posting flyers in mailboxes without checking if anyone is home.",
        diagramNote: "Client -- [SYN, Seq=x] ---> Server\nClient <--- [SYN-ACK, Seq=y, Ack=x+1] -- Server\nClient -- [ACK, Ack=y+1] ---> Server",
        workedExample: "If initial client sequence number is 1000 and it sends 500 bytes of payload, the next acknowledgement expected by client will be 1500.",
        questions: [
            {
                q: "What is the correct sequence of packets in a TCP 3-way handshake?",
                options: [
                    "SYN -> ACK -> SYN-ACK",
                    "SYN -> SYN-ACK -> ACK",
                    "ACK -> SYN -> FIN",
                    "CONNECT -> ACCEPT -> ESTABLISH"
                ],
                correct: 1,
                explanation: "Correct! The client sends SYN, the server responds with SYN-ACK, and the client replies with ACK."
            },
            {
                q: "Which characteristic distinguishes UDP from TCP?",
                options: [
                    "UDP guarantees packet delivery and ordering.",
                    "UDP uses a 3-way handshake before transmitting data.",
                    "UDP is connectionless with lower overhead, suitable for real-time streaming and DNS.",
                    "UDP requires explicit acknowledgement numbers for every segment."
                ],
                correct: 2,
                explanation: "Correct! UDP does not establish a connection or guarantee delivery, making it lightweight and fast."
            },
            {
                q: "What purpose do TCP sequence numbers serve?",
                options: [
                    "To encrypt the data payload against man-in-the-middle sniffing",
                    "To ensure data packets are reassembled in the correct order and missing packets are detected",
                    "To specify the destination MAC address on the local switch port",
                    "To allocate IPv4 subnet masks dynamically"
                ],
                correct: 1,
                explanation: "Correct! Sequence numbers track byte ordering so the receiving host can reassemble fragmented or out-of-order segments."
            }
        ],
        summary: "TCP guarantees reliability via stateful handshakes, sequence numbers, and acknowledgements."
    },
    {
        id: 4,
        title: "4. Network Layer & Packet Forwarding",
        desc: "IP vs MAC addresses, default gateways, routing between VLANs, and ARP table interpretation.",
        explanation: "Network Layer (Layer 3) routers inspect destination IP addresses to forward packets across different networks. While MAC addresses change at every router hop, source and destination IP addresses remain constant end-to-end.",
        analogy: "IP addresses are the city-to-city flight numbers, while MAC addresses are the specific baggage carts handling luggage on each tarmac runway.",
        diagramNote: "[Source IP/MAC] ---> [Router Default Gateway L3] ---> [Dest IP / New MAC Hop]",
        workedExample: "When a packet is destined for another subnet, a host sends it to its configured Default Gateway MAC address rather than the final destination MAC.",
        questions: [
            {
                q: "What happens to the Source and Destination MAC addresses when a packet passes through a router?",
                options: [
                    "They remain unchanged throughout the entire network path.",
                    "Both Source and Destination IP addresses are rewritten by the router.",
                    "The router strips old MAC addresses and replaces them with its own interface MAC (source) and next-hop router MAC (destination).",
                    "MAC addresses are converted directly into IPv6 prefixes."
                ],
                correct: 2,
                explanation: "Correct! Layer 2 MAC headers are rewritten at every single router hop, whereas Layer 3 IP headers remain untouched."
            },
            {
                q: "What is the primary role of a Default Gateway?",
                options: [
                    "To resolve local hostnames to IP addresses like a local DNS server",
                    "To provide an exit point for packets destined for devices outside the local subnet",
                    "To elect the Root Bridge in a switched topology",
                    "To assign dynamic DHCP leases to wireless clients"
                ],
                correct: 1,
                explanation: "Correct! The default gateway is the router interface IP on the local network that forwards traffic destined for remote networks."
            },
            {
                q: "How does a host decide whether to send a packet directly to a local IP or to the default gateway?",
                options: [
                    "It compares the destination IP address with its own subnet mask to determine if it is on the same local network.",
                    "It always sends packets to the default gateway first.",
                    "It checks the TCP port number in the packet header.",
                    "It queries the switch MAC address table directly."
                ],
                correct: 0,
                explanation: "Correct! By performing a bitwise AND between the destination IP and the subnet mask, the host determines local vs remote routing."
            }
        ],
        summary: "Routers forward packets between subnets using routing tables while rewriting Layer 2 headers at each hop."
    },
    {
        id: 5,
        title: "5. Spanning Tree Protocol (STP)",
        desc: "Switching loops, broadcast storms, Bridge ID elections, port roles, and Root Bridge configuration.",
        explanation: "Redundant physical links in switched networks cause infinite broadcast loops. STP prevents loops by placing redundant ports into a blocking state while maintaining automatic failover paths.",
        analogy: "STP is like traffic lights at a roundabout that block certain slip roads to prevent cars from driving in an endless circular loop.",
        diagramNote: "Bridge ID = Priority (2 bytes) + MAC Address (6 bytes). Lowest Bridge ID becomes Root Bridge.",
        workedExample: "Switch A (Priority 4096, MAC 00:11...) wins Root Bridge election over Switch B (Priority 32768, MAC 00:22...) because its priority is lower.",
        questions: [
            {
                q: "What problem occurs in a switched Ethernet network if redundant links exist without Spanning Tree Protocol?",
                options: [
                    "Broadcast storms, MAC table instability, and infinite frame looping",
                    "Instantaneous IPv4 subnet overlapping",
                    "Automatic doubling of bandwidth capacity",
                    "Encryption key corruption in TCP segments"
                ],
                correct: 0,
                explanation: "Correct! Without STP, broadcast frames circulate endlessly, consuming 100% link bandwidth and crashing switches."
            },
            {
                q: "How is the Root Bridge determined in an STP topology?",
                options: [
                    "The switch with the highest MAC address",
                    "The switch with the lowest Bridge ID (Priority + MAC address)",
                    "The switch physically connected to the internet router",
                    "The switch with the most active access ports"
                ],
                correct: 1,
                explanation: "Correct! The switch with the lowest Bridge ID (lowest priority value, then lowest MAC if priorities tie) becomes Root Bridge."
            },
            {
                q: "What role is assigned to switch ports that provide the least-cost path toward the Root Bridge?",
                options: ["Blocking Port", "Root Port", "Designated Port", "Disabled Port"],
                correct: 1,
                explanation: "Correct! Each non-root switch selects its single Root Port based on the lowest path cost to the Root Bridge."
            }
        ],
        summary: "STP eliminates Layer 2 loops by electing a Root Bridge and blocking redundant active paths."
    },
    {
        id: 6,
        title: "6. LAN Design & Link Aggregation",
        desc: "Core, distribution, access layers, PoE, converged networks, and EtherChannel link aggregation.",
        explanation: "Hierarchical LAN design splits networks into Access (end devices), Distribution (routing & policy), and Core (high-speed backbone). EtherChannel bundles multiple physical links into a single logical high-bandwidth channel.",
        analogy: "Hierarchical LAN design is like a corporate highway system: access roads connect driveways, regional highways distribute traffic, and multi-lane expressways handle core transit.",
        diagramNote: "[Access Layer Switches] === EtherChannel === [Distribution Layer Routers]",
        workedExample: "Combining four 1 Gbps physical Ethernet links via LACP EtherChannel creates a single logical 4 Gbps fault-tolerant trunk.",
        questions: [
            {
                q: "What is the primary function of the Access Layer in hierarchical LAN design?",
                options: [
                    "High-speed packet backbone routing across corporate datacenters",
                    "Connecting end-user devices (PCs, IP phones, printers) to the wired network",
                    "Providing inter-VLAN firewall security inspections",
                    "Serving as the authoritative Root Bridge for all VLANs"
                ],
                correct: 1,
                explanation: "Correct! The access layer provides user and device entry into the network infrastructure."
            },
            {
                q: "What are the key benefits of EtherChannel (Link Aggregation)?",
                options: [
                    "Increased aggregate bandwidth and automatic link redundancy/failover",
                    "Elimination of the need for IP subnet masks",
                    "Lower power consumption across wireless access points",
                    "Automatic translation of IPv4 addresses to IPv6"
                ],
                correct: 0,
                explanation: "Correct! EtherChannel aggregates multiple physical ports into one logical link, boosting bandwidth and providing redundancy."
            },
            {
                q: "What does Power over Ethernet (PoE) enable switches to do?",
                options: [
                    "Transmit data and electrical power over a single Ethernet twisted-pair cable",
                    "Backup power to the entire datacenter during total electrical grid failure",
                    "Boost Wi-Fi signal strength by amplifying radio frequencies",
                    "Convert optical fiber signals into copper coaxial cable"
                ],
                correct: 0,
                explanation: "Correct! PoE supplies DC electrical power alongside data over standard CAT5e/6 cables to power IP cameras, phones, and access points."
            }
        ],
        summary: "Hierarchical design ensures scalability, while EtherChannel and PoE provide resilience and device power."
    },
    {
        id: 7,
        title: "7. VLANs and Trunking",
        desc: "Access vs trunk ports, 802.1Q tagging, inter-VLAN routing, and network segmentation benefits.",
        explanation: "VLANs (Virtual Local Area Networks) logically segment physical switches into multiple broadcast domains. Trunk ports carry multiple VLANs between switches by inserting a 4-byte 802.1Q tag into Ethernet frames.",
        analogy: "VLANs are like different secure departments sharing the same office building but locked out of each other's offices using electronic badge doors.",
        diagramNote: "[Switch A VLAN 10] -- Tagged 802.1Q (VLAN 10) ---> [Trunk Link] ---> [Switch B VLAN 10]",
        workedExample: "An untagged frame arriving on an access port assigned to VLAN 20 is stamped with a 4-byte 802.1Q tag containing VLAN ID 20 before crossing a trunk link.",
        questions: [
            {
                q: "What is the purpose of an 802.1Q tag in a trunk port?",
                options: [
                    "To encrypt frame payloads against packet sniffing",
                    "To identify which VLAN a frame belongs to as it traverses a shared trunk link between switches",
                    "To assign dynamic IPv4 addresses to connected hosts",
                    "To prevent switching loops by blocking redundant paths"
                ],
                correct: 1,
                explanation: "Correct! The 4-byte 802.1Q header inserts the VLAN ID so switches know which VLAN the frame belongs to."
            },
            {
                q: "What is the difference between an Access Port and a Trunk Port?",
                options: [
                    "Access ports connect end devices and carry traffic for a single VLAN, while trunk ports connect switches and carry multiple VLANs.",
                    "Access ports use Wi-Fi signals while trunk ports use fiber optic cables exclusively.",
                    "Trunk ports only handle IPv6 packets, whereas access ports handle IPv4.",
                    "There is no operational difference in modern Cisco IOS switches."
                ],
                correct: 0,
                explanation: "Correct! Access ports belong to one VLAN for end users; trunk ports carry tagged traffic for multiple VLANs."
            },
            {
                q: "Why is Inter-VLAN routing required for devices in different VLANs to communicate?",
                options: [
                    "Because VLANs create separate broadcast domains that act as distinct logical subnets requiring a Layer 3 router or multilayer switch.",
                    "Because switches automatically drop TCP packets between VLANs for security.",
                    "Because MAC addresses cannot exist across different switch hardware.",
                    "Because 802.1Q tags strip away IP headers."
                ],
                correct: 0,
                explanation: "Correct! Devices on different VLANs reside on different subnets, requiring a Layer 3 device to route packets between them."
            }
        ],
        summary: "VLANs isolate broadcast domains, and 802.1Q trunking enables multi-VLAN transport across switches."
    },
    {
        id: 8,
        title: "8. Wireless Networking Fundamentals",
        desc: "SSID purpose, wireless network identification, and basic Wi-Fi security concepts.",
        explanation: "Wireless Local Area Networks (WLANs) use radio frequency (RF) bands (2.4 GHz and 5 GHz) to connect clients. SSIDs (Service Set Identifiers) name wireless networks, while WPA3/WPA2 provide encryption.",
        analogy: "An SSID is like the broadcast name of a radio station that your receiver tunes into, while WPA encryption is the scrambled radio frequency only decipherable with the correct password key.",
        diagramNote: "[Wireless Client] ---> (SSID Broadcast / WPA3 Encryption) ---> [Wireless Access Point]",
        workedExample: "A client scans for SSIDs, associates with the Access Point, completes WPA3 authentication handshake, and joins the bridged local subnet.",
        questions: [
            {
                q: "What is the primary function of an SSID (Service Set Identifier)?",
                options: [
                    "To uniquely name and identify a wireless local area network for clients",
                    "To assign MAC addresses to wireless network interface cards",
                    "To encrypt wireless data packets using 256-bit AES keys",
                    "To elect the Root Bridge among wireless access points"
                ],
                correct: 0,
                explanation: "Correct! The SSID is the human-readable network name broadcasted by access points so users can identify and connect to the WLAN."
            },
            {
                q: "Which wireless security protocol provides robust modern encryption and protection against offline dictionary attacks?",
                options: ["WEP", "WPA (TKIP)", "WPA3", "Open Authentication"],
                correct: 2,
                explanation: "Correct! WPA3 uses Simultaneous Authentication of Equals (SAE) to secure initial key exchange and protect against offline dictionary attacks."
            },
            {
                q: "Why are wireless networks more susceptible to eavesdropping compared to switched wired networks?",
                options: [
                    "Because radio frequency signals propagate through open air, allowing anyone within range to capture transmissions without physical jack access.",
                    "Because wireless devices do not use MAC addresses.",
                    "Because TCP handshakes are disabled on Wi-Fi routers.",
                    "Because wireless routers do not support VLAN tagging."
                ],
                correct: 0,
                explanation: "Correct! RF waves broadcast through the air in all directions, making wireless traffic vulnerable to passive over-the-air sniffing without encryption."
            }
        ],
        summary: "WLANs use SSIDs for identification and rely on robust encryption standards like WPA3 to secure over-the-air traffic."
    }
];

const revisionChecklistItems = [
    "Explain Ethernet frame structure, source/destination MAC addresses, and switch forwarding logic",
    "Perform IPv4 subnet mask calculations, CIDR conversions, and usable host range determinations",
    "Execute VLSM allocations from largest to smallest host requirements without overlapping",
    "Describe TCP three-way handshake mechanics, sequence/acknowledgement numbers, and flags",
    "Differentiate IP addresses (Layer 3) versus MAC addresses (Layer 2) across router hops",
    "Calculate Bridge ID priorities and MAC addresses to determine STP Root Bridge elections",
    "Configure and troubleshoot 802.1Q VLAN tagging, access ports, trunk ports, and Inter-VLAN routing",
    "Identify hierarchical LAN layers (Access, Distribution, Core), PoE benefits, and EtherChannel aggregation",
    "Explain wireless SSID identification, WLAN security protocols (WPA2/WPA3), and RF vulnerabilities"
];

// Local storage state keys
const STORAGE_KEY_PROGRESS = "netswitch_tutor_progress_2026";
const STORAGE_KEY_EXAMS = "netswitch_tutor_exams_2026";
const STORAGE_KEY_CHECKLIST = "netswitch_tutor_checklist_2026";

let userProgress = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS)) || {}; // { moduleId: { answered: X, correct: Y } }
let examHistory = JSON.parse(localStorage.getItem(STORAGE_KEY_EXAMS)) || [];
let checklistState = JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKLIST)) || {};

// Active navigation tab switcher
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (tabId === 'dashboard') {
        updateDashboardStats();
    }
}

// Initialize application on load
document.addEventListener('DOMContentLoaded', () => {
    renderModulesList();
    renderChecklist();
    updateDashboardStats();
});

// --- DASHBOARD & STATS ---
function updateDashboardStats() {
    let totalAnswered = 0;
    let totalCorrect = 0;
    let modulesCompleted = 0;

    syllabusModules.forEach(m => {
        const prog = userProgress[m.id];
        if (prog) {
            totalAnswered += (prog.answered || 0);
            totalCorrect += (prog.correct || 0);
            if (prog.answered >= m.questions.length) {
                modulesCompleted++;
            }
        }
    });

    const masteryPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    document.getElementById('stat-mastery').innerText = `${masteryPercent}%`;
    document.getElementById('stat-answered').innerText = totalAnswered;
    document.getElementById('stat-exams').innerText = examHistory.length;
    document.getElementById('overall-score-badge').innerText = `Progress: ${masteryPercent}% Mastery`;

    // Render module progress table on dashboard
    const container = document.getElementById('module-progress-list');
    container.innerHTML = '';
    syllabusModules.forEach(m => {
        const prog = userProgress[m.id] || { answered: 0, correct: 0 };
        const pct = prog.answered > 0 ? Math.round((prog.correct / prog.answered) * 100) : 0;
        
        container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <div>
                    <div class="font-semibold text-sm text-white">${m.title}</div>
                    <div class="text-xs text-slate-400">Practiced: ${prog.answered}/${m.questions.length} questions</div>
                </div>
                <div class="text-right">
                    <span class="text-sm font-bold text-accentcyan">${pct}%</span>
                </div>
            </div>
        `;
    });

    // Weak topic recommendation logic
    let lowestScore = 101;
    let weakestModule = null;
    syllabusModules.forEach(m => {
        const prog = userProgress[m.id] || { answered: 0, correct: 0 };
        const pct = prog.answered > 0 ? (prog.correct / prog.answered) : 0;
        if (prog.answered > 0 && pct < lowestScore) {
            lowestScore = pct;
            weakestModule = m;
        }
    });

    const recBox = document.getElementById('weak-topic-recommendation');
    if (weakestModule) {
        recBox.innerHTML = `Based on your practice history, we recommend reviewing <strong class="text-white">${weakestModule.title}</strong> to strengthen your conceptual understanding and calculation accuracy.`;
    } else {
        recBox.innerHTML = `Start practicing questions across the 8 learning modules to receive targeted weak-topic recommendations!`;
    }
}

function resetLocalStorageData() {
    if (confirm("Are you sure you want to reset all saved quiz progress and exam history?")) {
        localStorage.removeItem(STORAGE_KEY_PROGRESS);
        localStorage.removeItem(STORAGE_KEY_EXAMS);
        localStorage.removeItem(STORAGE_KEY_CHECKLIST);
        userProgress = {};
        examHistory = [];
        checklistState = {};
        updateDashboardStats();
        renderModulesList();
        renderChecklist();
        alert("Progress data successfully reset.");
    }
}

// --- MODULES RENDERING & LESSON VIEW ---
function renderModulesList() {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';

    syllabusModules.forEach(m => {
        const prog = userProgress[m.id] || { answered: 0, correct: 0 };
        grid.innerHTML += `
            <div onclick="openModuleDetail(${m.id})" class="bg-carddark hover:bg-slate-800/80 border border-slate-800 hover:border-accentcyan/50 p-5 rounded-2xl cursor-pointer transition flex flex-col justify-between space-y-4 group">
                <div>
                    <div class="text-accentcyan text-xs font-semibold uppercase mb-1">Module ${m.id}</div>
                    <h3 class="font-bold text-white group-hover:text-accentcyan transition">${m.title}</h3>
                    <p class="text-xs text-slate-400 mt-2 line-clamp-2">${m.desc}</p>
                </div>
                <div class="flex justify-between items-center text-xs pt-2 border-t border-slate-800 text-slate-400">
                    <span>Practiced: ${prog.answered}/${m.questions.length}</span>
                    <span class="text-accentcyan font-semibold">Start &rarr;</span>
                </div>
            </div>
        `;
    });
}

function backToModulesList() {
    document.getElementById('module-detail-view').classList.add('hidden');
    document.getElementById('module-selection-view').classList.remove('hidden');
}

function openModuleDetail(id) {
    const m = syllabusModules.find(item => item.id === id);
    if (!m) return;

    document.getElementById('module-selection-view').classList.add('hidden');
    document.getElementById('module-detail-view').classList.remove('hidden');

    const container = document.getElementById('module-content-container');
    
    let questionsHtml = '';
    m.questions.forEach((q, idx) => {
        let optionsHtml = '';
        q.options.forEach((opt, oIdx) => {
            optionsHtml += `
                <label class="block p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer text-sm text-slate-200 transition">
                    <input type="radio" name="mod-${m.id}-q-${idx}" value="${oIdx}" class="mr-2 text-accentcyan focus:ring-0">
                    ${opt}
                </label>
            `;
        });

        questionsHtml += `
            <div class="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-3" id="question-block-${m.id}-${idx}">
                <div class="font-semibold text-white text-sm">Question ${idx + 1}: ${q.q}</div>
                <div class="space-y-2">${optionsHtml}</div>
                <button onclick="submitModuleQuestion(${m.id}, ${idx})" class="bg-accentcyan/20 hover:bg-accentcyan/30 text-accentcyan border border-accentcyan/40 px-4 py-1.5 rounded-lg text-xs font-semibold transition">Submit Answer</button>
                <div id="feedback-${m.id}-${idx}" class="hidden mt-3 p-3 rounded-lg text-xs space-y-1"></div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="space-y-2">
            <span class="text-accentcyan text-xs font-semibold uppercase">Module ${m.id} Syllabus Lesson</span>
            <h2 class="text-2xl font-bold text-white">${m.title}</h2>
            <p class="text-sm text-slate-300 leading-relaxed">${m.explanation}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div class="text-xs font-bold text-accentcyan uppercase">Real-World Analogy</div>
                <p class="text-xs text-slate-300 leading-relaxed">${m.analogy}</p>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div class="text-xs font-bold text-accentcyan uppercase">Visual / Protocol Diagram</div>
                <pre class="text-xs font-mono text-cyan-300 bg-darknavy p-2 rounded border border-slate-800 overflow-x-auto">${m.diagramNote}</pre>
            </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div class="text-xs font-bold text-accentcyan uppercase">Worked Example & Calculation</div>
            <p class="text-xs text-slate-300 leading-relaxed">${m.workedExample}</p>
        </div>

        <div class="space-y-4 pt-4 border-t border-slate-800">
            <h3 class="text-lg font-bold text-white">Guided Practice Questions</h3>
            ${questionsHtml}
        </div>

        <div class="bg-accentcyan/10 border border-accentcyan/30 p-4 rounded-xl space-y-1">
            <div class="text-xs font-bold text-accentcyan uppercase">Revision Summary</div>
            <p class="text-xs text-slate-200">${m.summary}</p>
        </div>
    `;
}

function submitModuleQuestion(modId, qIdx) {
    const m = syllabusModules.find(item => item.id === modId);
    const q = m.questions[qIdx];
    const selected = document.querySelector(`input[name="mod-${modId}-q-${qIdx}"]:checked`);
    
    const feedbackBox = document.getElementById(`feedback-${modId}-${qIdx}`);
    feedbackBox.classList.remove('hidden');

    if (!selected) {
        feedbackBox.className = "mt-3 p-3 rounded-lg text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300";
        feedbackBox.innerHTML = "Please select an answer option before submitting.";
        return;
    }

    const val = parseInt(selected.value);
    const isCorrect = (val === q.correct);

    // Update progress state
    if (!userProgress[modId]) {
        userProgress[modId] = { answered: 1, correct: isCorrect ? 1 : 0 };
    } else {
        userProgress[modId].answered = Math.max(userProgress[modId].answered, qIdx + 1);
        if (isCorrect) userProgress[modId].correct = Math.min(userProgress[modId].answered, userProgress[modId].correct + 1);
    }
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(userProgress));

    if (isCorrect) {
        feedbackBox.className = "mt-3 p-3 rounded-lg text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1";
        feedbackBox.innerHTML = `<strong class="font-bold">Correct!</strong> ${q.explanation}`;
    } else {
        feedbackBox.className = "mt-3 p-3 rounded-lg text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1";
        feedbackBox.innerHTML = `<strong class="font-bold">Incorrect.</strong> ${q.explanation}`;
    }
}

// --- CALCULATORS & TOOLS ---
function switchTool(toolId) {
    document.querySelectorAll('.tool-pane').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tool-${toolId}`).classList.remove('hidden');

    document.querySelectorAll('.tool-tab-btn').forEach(btn => {
        if (btn.dataset.tool === toolId) {
            btn.className = "tool-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-accentcyan text-darknavy transition";
        } else {
            btn.className = "tool-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
        }
    });
}

function calculateSubnet() {
    const ipStr = document.getElementById('sub-ip').value.trim();
    const cidr = parseInt(document.getElementById('sub-cidr').value);
    const resultBox = document.getElementById('sub-result');

    // Simple validation
    const parts = ipStr.split('.');
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        resultBox.innerHTML = `<span class="text-rose-400">Error: Invalid IPv4 address format. Please enter four octets between 0 and 255.</span>`;
        return;
    }

    const totalIps = Math.pow(2, 32 - cidr);
    const usableHosts = Math.max(0, totalIps - 2);
    
    // Calculate subnet mask
    let maskVal = (~0 << (32 - cidr)) >>> 0;
    const mask = [
        (maskVal >>> 24) & 255,
        (maskVal >>> 16) & 255,
        (maskVal >>> 8) & 255,
        maskVal & 255
    ].join('.');

    resultBox.innerHTML = `
        <div class="text-accentcyan font-bold">IPv4 Subnet Calculation Result (/ ${cidr})</div>
        <div>IP Address: ${ipStr}</div>
        <div>Subnet Mask: ${mask}</div>
        <div>Total IP Addresses: ${totalIps}</div>
        <div>Usable Host Range: ${usableHosts > 0 ? `First usable to Last usable` : `N/A for /${cidr}`}</div>
        <div>Intermediate Steps: 32 - ${cidr} = ${32 - cidr} host bits. 2^${32 - cidr} = ${totalIps} total IPs.</div>
    `;
}

function calculateVLSM() {
    const parent = document.getElementById('vlsm-parent').value.trim();
    const hostsInput = document.getElementById('vlsm-hosts').value;
    const resultBox = document.getElementById('vlsm-result');

    const hostReqs = hostsInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (hostReqs.length === 0) {
        resultBox.innerHTML = `<span class="text-rose-400">Please enter valid comma-separated host requirements.</span>`;
        return;
    }

    // Sort descending for VLSM rule
    hostReqs.sort((a, b) => b - a);

    let html = `<div class="text-accentcyan font-bold mb-2">VLSM Allocation Schedule (Largest to Smallest Requirement)</div>`;
    hostReqs.forEach((req, idx) => {
        // Find required bits
        let hostBits = 0;
        while (Math.pow(2, hostBits) - 2 < req) {
            hostBits++;
        }
        const cidr = 32 - hostBits;
        const totalIps = Math.pow(2, hostBits);
        html += `<div class="p-2 bg-slate-900 border border-slate-800 rounded mb-1 text-xs">Subnet ${idx + 1}: Required Hosts = ${req} | Allocated CIDR = /${cidr} (${totalIps} total IPs, ${totalIps - 2} usable)</div>`;
    });

    resultBox.innerHTML = html;
}

function runTcpSimulation() {
    const res = document.getElementById('tcp-result');
    res.innerHTML = `
        <div class="text-accentcyan font-bold">TCP 3-Way Handshake & Sequence Tracking</div>
        <div>1. Client ---> [SYN] (Seq = 100) ---> Server</div>
        <div>2. Client <--- [SYN-ACK] (Seq = 500, Ack = 101) --- Server</div>
        <div>3. Client ---> [ACK] (Seq = 101, Ack = 501) ---> Server</div>
        <div class="text-emerald-400 mt-2">Connection Established Successfully! Reliable data transmission ready.</div>
    `;
}

function runStpElection() {
    const res = document.getElementById('stp-result');
    res.innerHTML = `
        <div class="text-accentcyan font-bold">STP Bridge Election Evaluation</div>
        <div>- Evaluating Switch A (Priority 32768, MAC 00-11-22-33-44-55)</div>
        <div>- Evaluating Switch B (Priority 4096, MAC 00-AA-BB-CC-DD-EE)</div>
        <div>- Evaluating Switch C (Priority 32768, MAC 00-FF-EE-DD-CC-BB)</div>
        <div class="text-emerald-400 mt-2 font-bold">Winner: Switch B is elected Root Bridge because it has the lowest Bridge Priority (4096).</div>
    `;
}

function simulateVlanTagging() {
    const vlan = document.getElementById('vlan-source').value;
    const portType = document.getElementById('vlan-porttype').value;
    const res = document.getElementById('vlan-result');

    if (portType === 'trunk') {
        res.innerHTML = `
            <div class="text-accentcyan font-bold">802.1Q Frame Traversal Simulation</div>
            <div>Original Frame received from VLAN ${vlan} access port.</div>
            <div>Switch inserts 4-byte 802.1Q tag containing VLAN ID ${vlan} into Ethernet header.</div>
            <div class="text-emerald-400 mt-2">Frame successfully transmitted across trunk link with tag intact!</div>
        `;
    } else {
        res.innerHTML = `
            <div class="text-accentcyan font-bold">Access Port Frame Forwarding</div>
            <div>Frame received on Access Port assigned to VLAN ${vlan}.</div>
            <div>Switch strips or omits 802.1Q tag before delivering untagged frame to end device on VLAN ${vlan}.</div>
        `;
    }
}

// --- EXAM SIMULATOR ---
let currentExamQuestions = [];
let currentExamIndex = 0;
let examAnswersSelected = {};
let examTimerInterval = null;
let timeLeftSeconds = 900; // 15 minutes

function startExam() {
    // Generate 6 random exam questions from all modules
    let pool = [];
    syllabusModules.forEach(m => {
        m.questions.forEach(q => pool.push(q));
    });
    // Shuffle pool
    pool.sort(() => Math.random() - 0.5);
    currentExamQuestions = pool.slice(0, 6);
    currentExamIndex = 0;
    examAnswersSelected = {};

    document.getElementById('exam-start-view').classList.add('hidden');
    document.getElementById('exam-results-view').classList.add('hidden');
    document.getElementById('exam-quiz-view').classList.remove('hidden');

    const enableTimer = document.getElementById('exam-timer-toggle').checked;
    if (enableTimer) {
        timeLeftSeconds = 900;
        document.getElementById('exam-timer-display').classList.remove('hidden');
        if (examTimerInterval) clearInterval(examTimerInterval);
        examTimerInterval = setInterval(() => {
            timeLeftSeconds--;
            let mins = Math.floor(timeLeftSeconds / 60);
            let secs = timeLeftSeconds % 60;
            document.getElementById('exam-timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            if (timeLeftSeconds <= 0) {
                clearInterval(examTimerInterval);
                finishExam();
            }
        }, 1000);
    } else {
        document.getElementById('exam-timer-display').classList.add('hidden');
    }

    renderExamQuestion();
}

function renderExamQuestion() {
    const q = currentExamQuestions[currentExamIndex];
    document.getElementById('exam-progress-indicator').innerText = `Question ${currentExamIndex + 1} of ${currentExamQuestions.length}`;

    let optionsHtml = '';
    q.options.forEach((opt, oIdx) => {
        const checked = examAnswersSelected[currentExamIndex] === oIdx ? 'checked' : '';
        optionsHtml += `
            <label class="block p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer text-sm text-slate-200 transition">
                <input type="radio" name="exam-q-radio" value="${oIdx}" ${checked} onchange="saveExamAnswer(${oIdx})" class="mr-2 text-accentcyan focus:ring-0">
                ${opt}
            </label>
        `;
    });

    document.getElementById('exam-question-card').innerHTML = `
        <div class="font-bold text-white text-base mb-3">${q.q}</div>
        <div class="space-y-2">${optionsHtml}</div>
    `;

    document.getElementById('exam-prev-btn').disabled = currentExamIndex === 0;
    if (currentExamIndex === currentExamQuestions.length - 1) {
        document.getElementById('exam-next-btn').innerText = "Finish Exam";
    } else {
        document.getElementById('exam-next-btn').innerText = "Next Question";
    }
}

function saveExamAnswer(idx) {
    examAnswersSelected[currentExamIndex] = idx;
}

function prevExamQuestion() {
    if (currentExamIndex > 0) {
        currentExamIndex--;
        renderExamQuestion();
    }
}

function nextExamQuestion() {
    if (currentExamIndex < currentExamQuestions.length - 1) {
        currentExamIndex++;
        renderExamQuestion();
    } else {
        finishExam();
    }
}

function finishExam() {
    if (examTimerInterval) clearInterval(examTimerInterval);

    let correctCount = 0;
    currentExamQuestions.forEach((q, idx) => {
        if (examAnswersSelected[idx] === q.correct) {
            correctCount++;
        }
    });

    const scorePct = Math.round((correctCount / currentExamQuestions.length) * 100);
    examHistory.push({ date: new Date().toLocaleDateString(), score: scorePct });
    localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(examHistory));

    document.getElementById('exam-quiz-view').classList.add('hidden');
    document.getElementById('exam-results-view').classList.remove('hidden');

    document.getElementById('exam-final-score').innerText = `${scorePct}%`;
    document.getElementById('exam-feedback-summary').innerText = `You scored ${correctCount} out of ${currentExamQuestions.length} correct.`;
    updateDashboardStats();
}

function reviewExamAnswers() {
    let reviewHtml = `<div class="space-y-4 text-left">`;
    currentExamQuestions.forEach((q, idx) => {
        const userAns = examAnswersSelected[idx];
        const isCorrect = userAns === q.correct;
        reviewHtml += `
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <div class="font-bold text-white">Q${idx + 1}: ${q.q}</div>
                <div>Your Answer: <span class="${isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}">${userAns !== undefined ? q.options[userAns] : 'Not Answered'}</span></div>
                <div>Correct Answer: <span class="text-accentcyan font-bold">${q.options[q.correct]}</span></div>
                <div class="text-slate-400 mt-1">${q.explanation}</div>
            </div>
        `;
    });
    reviewHtml += `</div><button onclick="startExam()" class="mt-4 bg-accentcyan text-darknavy font-bold px-4 py-2 rounded-xl text-xs">Retake New Set</button>`;
    
    document.getElementById('exam-results-view').innerHTML = reviewHtml;
}

// --- REVISION CHECKLIST ---
function renderChecklist() {
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    revisionChecklistItems.forEach((item, idx) => {
        const checked = checklistState[idx] ? 'checked' : '';
        container.innerHTML += `
            <label class="flex items-start space-x-3 p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
                <input type="checkbox" ${checked} onchange="toggleChecklistItem(${idx})" class="mt-0.5 rounded bg-darknavy border-slate-700 text-accentcyan focus:ring-0">
                <span class="text-sm text-slate-200">${item}</span>
            </label>
        `;
    });
}

function toggleChecklistItem(idx) {
    checklistState[idx] = !checklistState[idx];
    localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklistState));
}