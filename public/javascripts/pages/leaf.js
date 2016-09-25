/**
 * Prakhar Sahay 09/24/2016
 *
 * Used by leaf.ejs.
 */

var issue = find(issueId);
var parentIssue = find(issue.parent);

// color status
$("#status").text(issue.status);

// sets parent link
if (parentIssue) {
	var parentLink = $('<a>', {class: 'leaf-link', href: '/leaf/' + parentIssue.id});
	parentLink.text(parentIssue.title);
	$("#parent").append(parentLink);
} else {
	$("#parent").css('display', 'none');
}
$("#description").val(issue.description);
$("#title").val(issue.title);


// list children (find balance between DOM reflow and response time)
var issueList = $('<table>', {id: 'issue-list'});
issue.children.forEach(function (childId) {
	var child = find(childId);
	var issueDiv = makeIssueDiv(child);
	issueList.append(issueDiv);
});
$("#child-list").append(issueList);

// edit and make-branch event listeners
$("#title").on('input', function () {
	var status = notChanged() ? 'none' : 'block';
	$("#save-changes").css('display', status);
});
$("#description").on('input', function () {
	var status = notChanged() ? 'none' : 'block';
	$("#save-changes").css('display', status);
});
$("#save-changes").click(function () {
	issue.title = $("#title").val();
	issue.description = $("#description").val();
	update(issue);
	$(this).css('display', 'none');
});
function notChanged() {
	return $("#title").val() == issue.title && $("#description").val() == issue.description;
}

$("#make-branch").click(function () {
	location.href = '/branch/' + issueId;
});